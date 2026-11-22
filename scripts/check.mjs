import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isReleaseMode = process.argv.includes('--release');
const isTodoOnly = process.argv.includes('--todo-only');

const errors = [];
const warnings = [];
const todos = [];

console.log('\n======================================================');
console.log(`🔍 AWS FCAJ Report Verifier [Mode: ${isReleaseMode ? 'RELEASE (STRICT)' : 'DEVELOPMENT'}]`);
console.log('======================================================\n');

// 1. Scan for :::todo and Drafts
function scanFilesForTodosAndDrafts(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanFilesForTodosAndDrafts(fullPath);
    } else if (/\.(md|markdown)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const relPath = path.relative(rootDir, fullPath);

      // Find :::todo
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (/:::todo/i.test(line)) {
          todos.push({ file: relPath, line: idx + 1, text: line.trim() });
        }
      });

      // Check draft status
      if (/status:\s*["']?draft["']?/i.test(content)) {
        if (isReleaseMode) {
          errors.push(`[Draft Page]: ${relPath} is marked with status: "draft"`);
        } else {
          warnings.push(`[Draft Page]: ${relPath} is currently marked as "draft"`);
        }
      }
    }
  }
}

scanFilesForTodosAndDrafts(path.join(rootDir, 'content'));

if (isTodoOnly) {
  console.log('📋 CHECKLIST :::TODO CẦN HOÀN THIỆN:');
  if (todos.length === 0) {
    console.log('✨ Tuyệt vời! Không còn khối :::todo nào.');
  } else {
    todos.forEach((t) => {
      console.log(`  - [ ] ${t.file}:${t.line} -> ${t.text}`);
    });
  }
  process.exit(0);
}

// 2. Parity Check: content/en vs content/vi
function checkBilingualParity() {
  const enDir = path.join(rootDir, 'content', 'en');
  const viDir = path.join(rootDir, 'content', 'vi');

  if (!fs.existsSync(enDir) && !fs.existsSync(viDir)) {
    warnings.push('[Content Folder]: Both content/en and content/vi are empty (skeleton mode active).');
    return;
  }

  function getRelativeFiles(dir, base = dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getRelativeFiles(full, base));
      } else if (/\.(md|markdown)$/i.test(entry.name)) {
        files.push(path.relative(base, full).replace(/\\/g, '/'));
      }
    }
    return files;
  }

  const enFiles = new Set(getRelativeFiles(enDir));
  const viFiles = new Set(getRelativeFiles(viDir));

  for (const file of enFiles) {
    if (!viFiles.has(file)) {
      const msg = `[Parity Missing]: File content/en/${file} has no matching content/vi/${file}`;
      if (isReleaseMode) errors.push(msg);
      else warnings.push(msg);
    }
  }

  for (const file of viFiles) {
    if (!enFiles.has(file)) {
      const msg = `[Parity Missing]: File content/vi/${file} has no matching content/en/${file}`;
      if (isReleaseMode) errors.push(msg);
      else warnings.push(msg);
    }
  }
}

checkBilingualParity();

// 3. Check Cost Headings in Proposal and 5.6-monitoring-cost/5.6.3-cost
function checkCostHeadings() {
  const proposalPaths = [
    path.join(rootDir, 'content', 'en', '2-proposal', 'index.md'),
    path.join(rootDir, 'content', 'vi', '2-proposal', 'index.md'),
  ];

  const costPaths = [
    path.join(rootDir, 'content', 'en', '5-workshop', '5.6-monitoring-cost/5.6.3-cost', 'index.md'),
    path.join(rootDir, 'content', 'vi', '5-workshop', '5.6-monitoring-cost/5.6.3-cost', 'index.md'),
  ];

  [...proposalPaths, ...costPaths].forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (!/(cost|chi phí)/i.test(content)) {
        const msg = `[Rubric Violation - COST]: ${path.relative(rootDir, filePath)} must contain a 'Cost' or 'Chi phí' section and cost breakdown table.`;
        if (isReleaseMode) errors.push(msg);
        else warnings.push(msg);
      }
    }
  });
}

checkCostHeadings();

// 4. Secret Scan (AKIA, private keys, passwords)
function scanForSecrets(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const secretPatterns = [
    { name: 'AWS Access Key ID', regex: /AKIA[0-9A-Z]{16}/g },
    { name: 'Private Key Block', regex: /-----BEGIN (RSA|EC|OPENSSH|DSA|PGP)? PRIVATE KEY-----/g },
    { name: 'Hardcoded password string', regex: /password\s*[:=]\s*["'][^"']{6,}["']/gi },
  ];

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      scanForSecrets(fullPath);
    } else if (/\.(ts|tsx|js|mjs|md|json)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const pattern of secretPatterns) {
        if (pattern.regex.test(content)) {
          errors.push(`[SECURITY ALERT - SECRET DETECTED]: ${pattern.name} found in ${path.relative(rootDir, fullPath)}`);
        }
      }
    }
  }
}

scanForSecrets(path.join(rootDir, 'content'));
scanForSecrets(path.join(rootDir, 'src'));

// 5. Placeholder Checks (only in release mode)
if (isReleaseMode) {
  const siteConfigPath = path.join(rootDir, 'src', 'config', 'site.config.ts');
  if (fs.existsSync(siteConfigPath)) {
    const configContent = fs.readFileSync(siteConfigPath, 'utf8');
    const placeholders = ['[HỌ VÀ TÊN SINH VIÊN]', '[SỐ ĐIỆN THOẠI]', '[EMAIL SINH VIÊN]', '[TÊN TRƯỜNG ĐẠI HỌC'];
    for (const ph of placeholders) {
      if (configContent.includes(ph)) {
        errors.push(`[Release Gate - Placeholder]: Student config still contains placeholder: "${ph}" in src/config/site.config.ts`);
      }
    }
  }

  if (todos.length > 0) {
    errors.push(`[Release Gate - TODO Remaining]: Found ${todos.length} :::todo blocks in markdown content. All TODOs must be completed before release.`);
  }
}

// Print Report
if (todos.length > 0) {
  console.log(`📝 TODOs Found: ${todos.length} block(s) (run 'npm run todo:list' to view)`);
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:');
  warnings.forEach((w) => console.log(`   ${w}`));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS (Release Blockers):');
  errors.forEach((e) => console.log(`   ${e}`));
  console.log('\n⛔ Verification failed! Please resolve the above issues.\n');
  process.exit(1);
} else {
  console.log('\n✅ All checks passed successfully! Ready for grading.\n');
  process.exit(0);
}
