import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { findManifestItem } from '../../config/structure';

export const Breadcrumb: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const segments = location.pathname.split('/').filter(Boolean);
  // Remove language prefix
  const cleanSegments = segments[0] === 'en' || segments[0] === 'vi' ? segments.slice(1) : segments;

  if (cleanSegments.length === 0) {
    return null;
  }

  let accumulatedPath = '';
  const breadcrumbs = cleanSegments.map((seg, idx) => {
    accumulatedPath = accumulatedPath ? `${accumulatedPath}/${seg}` : seg;
    const item = findManifestItem(accumulatedPath);
    const title = item ? item.title[language] : seg;
    const pre = item ? item.pre : '';

    return {
      title,
      pre,
      path: `/${language}/${accumulatedPath}`,
      isLast: idx === cleanSegments.length - 1,
    };
  });

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap py-1">
      <Link
        to={`/${language}`}
        className="flex items-center hover:text-aws-smile transition-colors"
        title="Home"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>

      {breadcrumbs.map((crumb, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 mx-1.5 shrink-0 text-slate-400 dark:text-slate-600" />
          {crumb.isLast ? (
            <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[260px]">
              {crumb.pre && <span className="text-aws-smile font-mono mr-1">{crumb.pre}</span>}
              {crumb.title}
            </span>
          ) : (
            <Link
              to={crumb.path}
              className="hover:text-aws-smile transition-colors truncate max-w-[200px]"
            >
              {crumb.pre && <span className="font-mono mr-1">{crumb.pre}</span>}
              {crumb.title}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
