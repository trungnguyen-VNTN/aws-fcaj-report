import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const templateType = process.argv[2] || 'workshop-step';
const targetPath = process.argv[3];

if (!targetPath) {
  console.log(`
ℹ️ Cách dùng: node scripts/new-page.mjs <loại-template> <đường-dẫn-mục>

Ví dụ:
  npm run new:page worklog-week 1-worklog/1.1-week1
  npm run new:page proposal 2-proposal
  npm run new:page blog 3-blogs/3.1-blog1
  npm run new:page event 4-events/4.1-event1
  npm run new:page workshop-step 5-workshop/5.3-network-security

Các loại template có sẵn:
  - worklog-week
  - proposal
  - blog
  - event
  - workshop-step
  - self-evaluation
  - feedback
`);
  process.exit(0);
}

const templateFile = path.join(rootDir, 'content-templates', `${templateType}.md`);
if (!fs.existsSync(templateFile)) {
  console.error(`❌ Không tìm thấy template: ${templateType}.md trong content-templates/`);
  process.exit(1);
}

const templateContent = fs.readFileSync(templateFile, 'utf8');

// Create both EN and VI page directories
['en', 'vi'].forEach((lang) => {
  const targetDir = path.join(rootDir, 'content', lang, targetPath);
  fs.mkdirSync(targetDir, { recursive: true });

  const targetFile = path.join(targetDir, 'index.md');
  if (fs.existsSync(targetFile)) {
    console.log(`⚠️  File đã tồn tại, bỏ qua: ${path.relative(rootDir, targetFile)}`);
  } else {
    fs.writeFileSync(targetFile, templateContent, 'utf8');
    console.log(`✅ Đã tạo file: ${path.relative(rootDir, targetFile)}`);
  }
});

console.log('\n🎉 Tạo trang mới thành công! Bạn có thể chỉnh sửa nội dung file Markdown ngay bây giờ.');
