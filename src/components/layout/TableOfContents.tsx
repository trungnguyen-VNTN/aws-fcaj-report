import React, { useEffect, useState } from 'react';
import { TocItem } from '../../services/contentLoader';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUp, AlignLeft } from 'lucide-react';

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:block w-64 shrink-0 toc-container">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pl-4 border-l border-slate-200 dark:border-aws-borderDark text-xs">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-400 mb-3">
          <AlignLeft className="w-3.5 h-3.5" />
          <span>{t.common.onThisPage}</span>
        </div>

        <ul className="space-y-2">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li
                key={item.id}
                style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}
              >
                <a
                  href={`#${item.id}`}
                  className={`block py-0.5 leading-snug transition-colors line-clamp-2 ${
                    isActive
                      ? 'text-aws-smile font-semibold dark:text-amber-400'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      history.pushState(null, '', `#${item.id}`);
                      setActiveId(item.id);
                    }
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Back to top button */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-aws-borderDark/60">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-500 hover:text-aws-smile dark:text-slate-400 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{t.common.backToTop}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
