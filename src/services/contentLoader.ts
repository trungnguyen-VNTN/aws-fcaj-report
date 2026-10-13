import yaml from 'js-yaml';
import { reportManifest, flattenManifest } from '../config/structure';
import { Language } from '../i18n/translations';

export interface FrontMatter {
  title?: string;
  weight?: number;
  pre?: string;
  description?: string;
  status?: 'draft' | 'ready';
  date?: string;
  tags?: string[];
  [key: string]: any;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ParsedDocument {
  lang: Language;
  routePath: string; // e.g. "1-worklog/1.1-week1"
  fullRoute: string; // e.g. "/en/1-worklog/1.1-week1"
  frontMatter: FrontMatter;
  rawContent: string;
  content: string; // markdown content without frontmatter
  toc: TocItem[];
  readingTimeMinutes: number;
  wordCount: number;
  isReady: boolean;
}

// Vite eager glob import of all markdown files inside /content
const markdownFiles = import.meta.glob('/content/**/*.{md,markdown}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * Parses frontmatter and body from raw markdown string
 */
export function parseMarkdownWithFrontmatter(raw: string): { frontMatter: FrontMatter; content: string } {
  if (!raw) return { frontMatter: {}, content: '' };

  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) {
    return { frontMatter: {}, content: raw };
  }

  const endIdx = trimmed.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { frontMatter: {}, content: raw };
  }

  const yamlBlock = trimmed.slice(3, endIdx).trim();
  const content = trimmed.slice(endIdx + 4).trimStart();

  try {
    const parsed = (yaml.load(yamlBlock) as FrontMatter) || {};
    return { frontMatter: parsed, content };
  } catch (err) {
    console.warn('Failed to parse frontmatter YAML:', err);
    return { frontMatter: {}, content };
  }
}

/**
 * Extracts Table of Contents (h2 and h3) from markdown content
 */
export function extractTocFromMarkdown(content: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2Match = trimmed.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].replace(/#+$/, '').trim();
      const id = slugify(text);
      headings.push({ id, text, level: 2 });
      continue;
    }

    const h3Match = trimmed.match(/^###\s+(.+)$/);
    if (h3Match) {
      const text = h3Match[1].replace(/#+$/, '').trim();
      const id = slugify(text);
      headings.push({ id, text, level: 3 });
      continue;
    }
  }

  return headings;
}

/**
 * Simple Vietnamese-friendly slugify
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Normalize filepath from Vite glob to canonical route path
 * Examples:
 * /content/en/1-worklog/1.1-week1/index.md -> lang: en, path: 1-worklog/1.1-week1
 * /content/vi/2-proposal/index.md -> lang: vi, path: 2-proposal
 * /content/en/5-workshop/5.3-network-security.md -> lang: en, path: 5-workshop/5.3-network-security
 */
function normalizeFilePathToRoute(filePath: string): { lang: Language; routePath: string } | null {
  // Remove leading slash and /content/ prefix
  const cleaned = filePath.replace(/^\/?(src\/)?content\//, '');
  const parts = cleaned.split('/');

  if (parts.length < 2) return null;

  const lang = parts[0] === 'en' ? 'en' : parts[0] === 'vi' ? 'vi' : null;
  if (!lang) return null;

  const restParts = parts.slice(1);
  const lastPart = restParts[restParts.length - 1];

  // Handle _index.md, _index.vi.md, index.md
  if (lastPart === 'index.md' || lastPart === '_index.md' || lastPart === '_index.vi.md') {
    restParts.pop();
  } else {
    // Strip .md
    restParts[restParts.length - 1] = lastPart.replace(/\.(md|markdown)$/, '');
  }

  const routePath = restParts.join('/');
  return { lang, routePath };
}

/**
 * Build index of all parsed documents
 */
const parsedDocumentStore: Map<string, ParsedDocument> = new Map();

for (const [filePath, rawContent] of Object.entries(markdownFiles)) {
  const norm = normalizeFilePathToRoute(filePath);
  if (!norm) continue;

  const { frontMatter, content } = parseMarkdownWithFrontmatter(rawContent);
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
  const toc = extractTocFromMarkdown(content);

  const isReady = frontMatter.status === 'ready' || (Boolean(content) && content.length > 100 && frontMatter.status !== 'draft');

  const key = `${norm.lang}:${norm.routePath}`;
  parsedDocumentStore.set(key, {
    lang: norm.lang,
    routePath: norm.routePath,
    fullRoute: `/${norm.lang}/${norm.routePath}`,
    frontMatter,
    rawContent,
    content,
    toc,
    readingTimeMinutes,
    wordCount: words,
    isReady,
  });
}

/**
 * Get document by language and route path
 */
export function getDocument(lang: Language, routePath: string): ParsedDocument | undefined {
  const clean = routePath.replace(/^\//, '').replace(/\/$/, '').replace(/^(en|vi)\//, '');
  return parsedDocumentStore.get(`${lang}:${clean}`);
}

/**
 * Get all loaded documents for a language
 */
export function getAllDocuments(lang: Language): ParsedDocument[] {
  const result: ParsedDocument[] = [];
  for (const [key, doc] of parsedDocumentStore.entries()) {
    if (key.startsWith(`${lang}:`)) {
      result.push(doc);
    }
  }
  return result;
}

/**
 * Calculate completion stats across all manifest items
 */
export function getReportProgressStats(lang: Language): {
  totalItems: number;
  completedItems: number;
  percentage: number;
} {
  const allItems = flattenManifest(reportManifest);
  const totalItems = allItems.length;

  let completedItems = 0;
  for (const item of allItems) {
    const doc = parsedDocumentStore.get(`${lang}:${item.path}`);
    if (doc && doc.isReady) {
      completedItems++;
    }
  }

  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  return { totalItems, completedItems, percentage };
}

/**
 * Check if a route has a ready document
 */
export function isRouteCompleted(lang: Language, routePath: string): boolean {
  const clean = routePath.replace(/^\//, '').replace(/\/$/, '').replace(/^(en|vi)\//, '');
  const doc = parsedDocumentStore.get(`${lang}:${clean}`);
  return Boolean(doc && doc.isReady);
}
