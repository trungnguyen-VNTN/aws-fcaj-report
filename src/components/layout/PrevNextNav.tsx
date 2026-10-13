import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPrevNextItems } from '../../config/structure';
import { useLanguage } from '../../context/LanguageContext';

export const PrevNextNav: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  const currentPath = location.pathname.replace(/^\/(en|vi)\/?/, '');
  const { prev, next } = getPrevNextItems(currentPath);

  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-200 dark:border-aws-borderDark no-print">
      {prev ? (
        <Link
          to={`/${language}/${prev.path}`}
          className="group flex flex-col p-4 rounded-xl border border-slate-200 dark:border-aws-borderDark hover:border-aws-smile/60 bg-white dark:bg-aws-cardDark hover:shadow-glow-orange transition-all duration-200 text-left"
        >
          <div className="flex items-center text-xs text-slate-400 mb-1 group-hover:text-aws-smile transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1 shrink-0 -translate-x-0.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.common.prev}</span>
          </div>
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
            {prev.pre && <span className="font-mono text-aws-smile mr-1.5">{prev.pre}</span>}
            {prev.title[language]}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next && (
        <Link
          to={`/${language}/${next.path}`}
          className="group flex flex-col p-4 rounded-xl border border-slate-200 dark:border-aws-borderDark hover:border-aws-smile/60 bg-white dark:bg-aws-cardDark hover:shadow-glow-orange transition-all duration-200 text-right sm:col-start-2"
        >
          <div className="flex items-center justify-end text-xs text-slate-400 mb-1 group-hover:text-aws-smile transition-colors">
            <span>{t.common.next}</span>
            <ChevronRight className="w-4 h-4 ml-1 shrink-0 translate-x-0.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">
            {next.pre && <span className="font-mono text-aws-smile mr-1.5">{next.pre}</span>}
            {next.title[language]}
          </span>
        </Link>
      )}
    </div>
  );
};
