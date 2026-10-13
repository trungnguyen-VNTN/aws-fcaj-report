import React, { useState } from 'react';
import { NavItem } from '../../config/structure';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Copy,
  Check,
  BookOpen,
  FolderOpen,
  Sparkles,
  ArrowRight,
  ListTree,
} from 'lucide-react';

interface EmptyStateProps {
  item: NavItem;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ item }) => {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const expectedPath = `content/${language}/${item.path}/index.md`;
  const headings = item.suggestedHeadings?.[language] || [];

  // Generate markdown template skeleton for this page
  const generateTemplateMarkdown = () => {
    let md = `---
title: "${item.title[language]}"
weight: 1
pre: "${item.pre}"
description: "${item.description?.[language] || ''}"
status: "draft"
---

:::notice{type="info"}
${language === 'vi' ? 'Trang báo cáo theo chuẩn First Cloud AI Journey.' : 'Report section compliant with FCAJ standards.'}
:::

`;

    headings.forEach((heading) => {
      md += `## ${heading}\n\n:::todo\n${language === 'vi' ? 'Mô tả nội dung chi tiết cho mục này...' : 'Write detailed technical content for this section...'}\n:::\n\n`;
    });

    return md;
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(generateTemplateMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="space-y-8 my-4 animate-in fade-in duration-300">
      {/* Empty State Banner */}
      <Card className="relative overflow-hidden border-2 border-dashed border-slate-300 dark:border-aws-borderDark/90 bg-gradient-to-br from-slate-50/60 to-amber-500/5 dark:from-aws-cardDark dark:to-amber-500/10 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Badge variant="amber" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
              {t.emptyState.badge}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              {item.pre} {item.id}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyTemplate}
            icon={copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? t.common.copied : t.emptyState.copyTemplate}
          </Button>
        </div>

        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.emptyState.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.emptyState.message}
          </p>
        </div>

        {/* Expected File Path box */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300">
            <FolderOpen className="w-4 h-4 text-aws-smile shrink-0" />
            <span className="text-slate-400">{t.emptyState.folderHint}</span>
            <span className="text-amber-400 font-semibold select-all">{expectedPath}</span>
          </div>
          <span className="text-[11px] text-slate-500">
            {language === 'vi' ? 'Tự nhận diện không cần sửa code' : 'Auto-detected without code changes'}
          </span>
        </div>
      </Card>

      {/* Suggested Headings to write */}
      {headings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-aws-smile" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              {t.emptyState.suggestedHeadingsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {headings.map((heading, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-aws-borderDark bg-white dark:bg-aws-cardDark"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {heading}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'vi'
                      ? 'Thêm mục này vào file Markdown để hoàn thiện tiêu chuẩn chấm điểm.'
                      : 'Cover this section in Markdown to fulfill grading criteria.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Child pages if this is a parent category */}
      {item.children && item.children.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-aws-teal" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
              {language === 'vi' ? 'Các trang con trong mục này:' : 'Sub-pages in this section:'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {item.children.map((child) => (
              <a
                key={child.id}
                href={`#/${language}/${child.path}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.hash = '';
                  window.location.pathname = `/${language}/${child.path}`;
                }}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-aws-borderDark hover:border-aws-smile/60 bg-white dark:bg-aws-cardDark hover:shadow-glow-orange transition-all flex items-center justify-between text-xs group"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-aws-smile font-bold shrink-0">{child.pre}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-aws-smile">
                    {child.title[language]}
                  </span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-aws-smile group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
