import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getDocument } from '../services/contentLoader';
import { findManifestItem } from '../config/structure';
import { useLanguage } from '../context/LanguageContext';
import { MarkdownRenderer } from '../components/markdown/MarkdownRenderer';
import { TableOfContents } from '../components/layout/TableOfContents';
import { PrevNextNav } from '../components/layout/PrevNextNav';
import { EmptyState } from '../components/specialized/EmptyState';
import { Badge } from '../components/common/Badge';
import { WorklogTimeline } from '../components/specialized/WorklogTimeline';
import { WorklogTable } from '../components/specialized/WorklogTable';
import { CostTable } from '../components/specialized/CostTable';
import { SelfEvalTable } from '../components/specialized/SelfEvalTable';
import { BlogCard } from '../components/specialized/BlogCard';
import { EventCard } from '../components/specialized/EventCard';
import { ArchitectureFigure } from '../components/specialized/ArchitectureFigure';
import { InternProfile } from '../components/specialized/InternProfile';
import { Clock } from 'lucide-react';

export const DocPage: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  // Extract clean route path without language prefix
  const cleanPath = location.pathname.replace(/^\/(en|vi)\/?/, '');

  // Look up document in parsed markdown store
  const doc = useMemo(() => {
    return getDocument(language, cleanPath);
  }, [language, cleanPath]);

  // Look up item in manifest structure
  const manifestItem = useMemo(() => {
    return findManifestItem(cleanPath);
  }, [cleanPath]);

  // Compute page title, pre, and description
  const pageTitle = doc?.frontMatter.title || manifestItem?.title[language] || cleanPath;
  const pagePre = doc?.frontMatter.pre || manifestItem?.pre || '';
  const pageDescription = doc?.frontMatter.description || manifestItem?.description?.[language] || '';

  // Compute Table of Contents
  const toc = useMemo(() => {
    if (doc && doc.toc && doc.toc.length > 0) {
      return doc.toc;
    }
    // If empty state with suggested headings
    if (manifestItem?.suggestedHeadings?.[language]) {
      return manifestItem.suggestedHeadings[language].map((heading) => ({
        id: heading.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        text: heading,
        level: 2,
      }));
    }
    return [];
  }, [doc, manifestItem, language]);

  const isContentReady = Boolean(doc && doc.isReady);

  return (
    <div className="flex gap-8 relative items-start">
      {/* Main Document Body */}
      <article className="flex-1 min-w-0 max-w-4xl">
        {/* Document Header */}
        <header className="mb-8 pb-6 border-b border-slate-200 dark:border-aws-borderDark">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {pagePre && (
              <Badge variant="orange" size="md">
                <span className="font-mono">{pagePre}</span>
              </Badge>
            )}

            {isContentReady ? (
              <Badge variant="green" size="sm">
                {t.common.ready}
              </Badge>
            ) : (
              <Badge variant="amber" size="sm">
                {doc?.content.trim() ? t.common.draft : t.common.skeleton}
              </Badge>
            )}

            {doc && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono ml-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>{doc.readingTimeMinutes} {t.common.minutes} {t.common.readingTime.toLowerCase()}</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {pageTitle}
          </h1>

          {pageDescription && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              {pageDescription}
            </p>
          )}
        </header>

        {cleanPath === '0-information' && <InternProfile />}

        {/* Document Content Rendering */}
        {doc?.content.trim() ? (
          <MarkdownRenderer content={doc.content} />
        ) : (
          <div className="space-y-10">
            {manifestItem && <EmptyState item={manifestItem} />}

            {/* Specialized interactive skeletons per route */}
            {cleanPath === '1-worklog' && <WorklogTimeline />}

            {cleanPath.startsWith('1-worklog/1.') && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'vi' ? 'Bảng công việc mẫu (Worklog Table)' : 'Daily Task Table Template'}
                </h3>
                <WorklogTable
                  items={[
                    {
                      day: language === 'vi' ? 'Thứ 2' : 'Mon',
                      task: language === 'vi' ? 'Nghiên cứu tài liệu kỹ thuật & thiết kế giải pháp' : 'Technical research & solution design',
                      startDate: '2025-08-11',
                      completionDate: '2025-08-11',
                      referenceUrl: 'https://docs.aws.amazon.com',
                      referenceLabel: 'AWS Docs',
                    },
                    {
                      day: language === 'vi' ? 'Thứ 3' : 'Tue',
                      task: language === 'vi' ? 'Cấu hình hạ tầng & viết test kiểm thử' : 'Infrastructure setup & test authoring',
                      startDate: '2025-08-12',
                      completionDate: '2025-08-12',
                    },
                    {
                      day: language === 'vi' ? 'Thứ 4' : 'Wed',
                      task: language === 'vi' ? 'Triển khai mô hình AI & kiểm tra Guardrails' : 'AI model deployment & Guardrails validation',
                      startDate: '2025-08-13',
                      completionDate: '2025-08-13',
                    },
                  ]}
                />
              </div>
            )}

            {(cleanPath === '2-proposal' || cleanPath === '5-workshop/5.1-overview') && (
              <div className="space-y-6">
                <ArchitectureFigure />
                {cleanPath === '2-proposal' && <CostTable />}
              </div>
            )}

            {cleanPath === '3-blogs' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <BlogCard
                  title="Deep Dive: Xây dựng Hệ thống Serverless Event-Driven trên AWS"
                  date="2025-09-15"
                  summary="Tìm hiểu cách phân rã microservices và tối ưu độ trễ với Amazon EventBridge và AWS Lambda."
                  externalUrl="https://awsstudygroup.com"
                />
                <BlogCard
                  title="Ứng dụng Amazon Bedrock Guardrails bảo vệ ứng dụng GenAI thực tế"
                  date="2025-09-28"
                  summary="Triển khai chính sách chặn rò rỉ dữ liệu PII và kiểm soát an toàn câu trả lời của mô hình ngôn ngữ lớn."
                  externalUrl="https://awsstudygroup.com"
                />
                <BlogCard
                  title="Tối ưu chi phí và hiệu năng kiến trúc Cloud Well-Architected"
                  date="2025-10-10"
                  summary="Kinh nghiệm thực tiễn áp dụng AWS Well-Architected Framework trong đề tài thực tập FCAJ."
                  externalUrl="https://awsstudygroup.com"
                />
              </div>
            )}

            {cleanPath === '4-events' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <EventCard
                  title="AWS Community Day Vietnam"
                  date="2025-09-20"
                  location="TP. Hồ Chí Minh"
                  role="Attendee"
                  summary="Tham gia các phiên kỹ thuật chuyên sâu về Cloud & AI, kết nối cùng các chuyên gia và AWS Heroes."
                />
                <EventCard
                  title="AWS GenAI & Cloud Innovation Summit"
                  date="2025-10-05"
                  location="Online / Hybrid"
                  role="Participant"
                  summary="Cập nhật các đột phá công nghệ mới nhất về Generative AI và ứng dụng thực tiễn của Amazon Bedrock."
                />
                <EventCard
                  title="FCAJ Technical Mentoring Session"
                  date="2025-10-22"
                  location="AWS Office / Meet"
                  role="Intern Presenter"
                  summary="Trình bày kiến trúc đề tài Workshop và tiếp thu phản hồi phản biện trực tiếp từ các Mentors FCAJ."
                />
              </div>
            )}

            {cleanPath === '5-workshop/5.11-cost' && <CostTable />}

            {cleanPath === '6-self-evaluation' && <SelfEvalTable />}
          </div>
        )}

        {/* Prev / Next Page Cards */}
        <PrevNextNav />
      </article>

      {/* Right Table of Contents (Scroll-Spy) */}
      <TableOfContents items={toc} />
    </div>
  );
};
