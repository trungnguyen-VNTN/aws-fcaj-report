import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { CodeBlock } from './CodeBlock';
import { Notice, NoticeType } from './Notice';
import { Figure } from './Figure';
import { TodoBlock } from './TodoBlock';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Preprocesses custom shortcodes and Hugo syntax into standard HTML tags
 * that can be easily parsed by ReactMarkdown and converted to React components.
 */
function preprocessMarkdownDirectives(markdown: string): string {
  let processed = markdown;

  // 1. Convert Hugo notice: {{% notice (type) %}}...{{% /notice %}}
  processed = processed.replace(
    /\{\{%\s*notice\s+(\w+)\s*%\}\}([\s\S]*?)\{\{%\s*\/notice\s*%\}\}/gi,
    (_, type, body) => `<div data-notice="${type.toLowerCase()}">${body.trim()}</div>`
  );

  // 2. Convert :::notice{type="..." title="..."}
  processed = processed.replace(
    /:::notice(?:\{type="?(\w+)"?(?:\s+title="?([^"}]+)"?)?\})?([\s\S]*?):::/gi,
    (_, type = 'info', title = '', body) =>
      `<div data-notice="${type.toLowerCase()}" data-title="${title}">${body.trim()}</div>`
  );

  // 3. Convert :::todo[title] or :::todo{title="..."} or :::todo
  processed = processed.replace(
    /:::todo(?:\{title="?([^"}]+)"?\}|\[([^\]]+)\])?([\s\S]*?):::/gi,
    (_, title1, title2, body) =>
      `<div data-todo="true" data-title="${title1 || title2 || ''}">${body.trim()}</div>`
  );

  // 4. Convert :::figure{src="..." alt="..." caption="..."}
  processed = processed.replace(
    /:::figure\{src="([^"}]+)"(?:\s+alt="([^"}]*)")?(?:\s+caption="([^"}]*)")?\}/gi,
    (_, src, alt = '', caption = '') =>
      `<div data-figure="true" data-src="${src}" data-alt="${alt}" data-caption="${caption}"></div>`
  );

  return processed;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const { language } = useLanguage();
  const preprocessed = preprocessMarkdownDirectives(content);

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-aws-anchor dark:prose-a:text-aws-teal hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-img:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          // Code & Syntax highlighting
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const value = String(children).replace(/\n$/, '');
            const isInline = !match && !value.includes('\n');

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded font-mono text-xs bg-slate-100 dark:bg-aws-cardDark border border-slate-200 dark:border-aws-borderDark text-amber-600 dark:text-amber-400"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                language={match ? match[1] : ''}
                value={value}
              />
            );
          },

          // Images
          img({ src, alt }) {
            return (
              <Figure
                src={src || ''}
                alt={alt || ''}
                caption={alt}
              />
            );
          },

          // Links (rewrite relative links to current language route)
          a({ href, children, ...props }) {
            if (!href) return <span {...props}>{children}</span>;

            // External links
            if (href.startsWith('http://') || href.startsWith('https://')) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-aws-anchor dark:text-aws-teal hover:underline inline-flex items-center gap-0.5"
                  {...props}
                >
                  {children}
                </a>
              );
            }

            // Internal anchor hash links
            if (href.startsWith('#')) {
              return (
                <a href={href} className="text-aws-anchor dark:text-aws-teal hover:underline" {...props}>
                  {children}
                </a>
              );
            }

            // Relative document links
            const cleanHref = href.replace(/^\.?\//, '').replace(/\.(md|html)$/, '');
            const targetRoute = `/${language}/${cleanHref}`;

            return (
              <Link to={targetRoute} className="text-aws-anchor dark:text-aws-teal hover:underline font-medium" {...props}>
                {children}
              </Link>
            );
          },

          // Custom Container Directives (Notice, Todo, Figure)
          div({ node, className, children, ...props }: any) {
            const dataNotice = props['data-notice'];
            if (dataNotice) {
              return (
                <Notice
                  type={dataNotice as NoticeType}
                  title={props['data-title']}
                >
                  {children}
                </Notice>
              );
            }

            if (props['data-todo']) {
              return (
                <TodoBlock title={props['data-title']}>
                  {children}
                </TodoBlock>
              );
            }

            if (props['data-figure']) {
              return (
                <Figure
                  src={props['data-src']}
                  alt={props['data-alt'] || ''}
                  caption={props['data-caption']}
                />
              );
            }

            return <div className={className} {...props}>{children}</div>;
          },

          // Tables with responsive wrapper
          table({ children }) {
            return (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-aws-borderDark shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-aws-borderDark text-sm">
                  {children}
                </table>
              </div>
            );
          },

          thead({ children }) {
            return (
              <thead className="bg-slate-50 dark:bg-aws-cardDark text-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-wider">
                {children}
              </thead>
            );
          },

          th({ children }) {
            return (
              <th className="px-4 py-3 text-left font-semibold">
                {children}
              </th>
            );
          },

          td({ children }) {
            return (
              <td className="px-4 py-3 border-t border-slate-100 dark:border-slate-800/80 text-slate-700 dark:text-slate-300">
                {children}
              </td>
            );
          },
        }}
      >
        {preprocessed}
      </ReactMarkdown>
    </div>
  );
};
