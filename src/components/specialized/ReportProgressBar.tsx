import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getReportProgressStats } from '../../services/contentLoader';
import { CheckCircle2 } from 'lucide-react';

export const ReportProgressBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, t } = useLanguage();
  const { totalItems, completedItems, percentage } = getReportProgressStats(language);

  return (
    <div className={`p-4 rounded-xl border border-slate-200 dark:border-aws-borderDark bg-white dark:bg-aws-cardDark shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-aws-smile" />
          <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
            {t.home.progressTitle}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {completedItems} / {totalItems} {t.home.pagesCompleted}
          </span>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-aws-smile via-amber-400 to-aws-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(percentage, 3)}%` }}
        />
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
        {t.home.progressSubtitle}
      </p>
    </div>
  );
};
