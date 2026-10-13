import { describe, it, expect } from 'vitest';
import { parseMarkdownWithFrontmatter, extractTocFromMarkdown, slugify } from '../services/contentLoader';

describe('Markdown & Frontmatter Processing', () => {
  it('correctly parses YAML frontmatter and body', () => {
    const raw = `---
title: "Worklog Tuần 1"
weight: 1
pre: "1.1."
status: "ready"
---

# Bắt đầu thực tập
Nội dung tuần đầu tiên.
`;

    const { frontMatter, content } = parseMarkdownWithFrontmatter(raw);
    expect(frontMatter.title).toBe('Worklog Tuần 1');
    expect(frontMatter.weight).toBe(1);
    expect(frontMatter.pre).toBe('1.1.');
    expect(frontMatter.status).toBe('ready');
    expect(content).toContain('# Bắt đầu thực tập');
  });

  it('extracts table of contents items from headings', () => {
    const markdown = `
# Main Title (h1 ignored in TOC)

## 1. Tổng quan kiến trúc
Nội dung kiến trúc.

### 1.1 Chi tiết VPC
Chi tiết subnet.

## 2. Ước tính chi phí
Bảng chi phí.
`;

    const toc = extractTocFromMarkdown(markdown);
    expect(toc).toHaveLength(3);
    expect(toc[0].text).toBe('1. Tổng quan kiến trúc');
    expect(toc[0].level).toBe(2);
    expect(toc[1].text).toBe('1.1 Chi tiết VPC');
    expect(toc[1].level).toBe(3);
    expect(toc[2].text).toBe('2. Ước tính chi phí');
  });

  it('slugifies Vietnamese headings accurately', () => {
    expect(slugify('Tổng quan kiến trúc')).toBe('tong-quan-kien-truc');
    expect(slugify('Đề xuất giải pháp & Chi phí')).toBe('de-xuat-giai-phap-chi-phi');
  });
});
