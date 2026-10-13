import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface WorklogDayItem {
  day: string; // e.g. "Thứ 2" / "Monday"
  task: string;
  startDate: string;
  completionDate: string;
  referenceUrl?: string;
  referenceLabel?: string;
}

interface WorklogTableProps {
  items: WorklogDayItem[];
}

export const WorklogTable: React.FC<WorklogTableProps> = ({ items }) => {
  const { t } = useLanguage();

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-aws-borderDark shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-aws-borderDark text-xs sm:text-sm">
        <thead className="bg-slate-50 dark:bg-aws-cardDark text-slate-700 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
          <tr>
            <th className="px-3 sm:px-4 py-3 text-left w-20">{t.specialized.worklog.tableDay}</th>
            <th className="px-3 sm:px-4 py-3 text-left">{t.specialized.worklog.tableTask}</th>
            <th className="px-3 sm:px-4 py-3 text-left w-28 whitespace-nowrap">{t.specialized.worklog.tableStart}</th>
            <th className="px-3 sm:px-4 py-3 text-left w-28 whitespace-nowrap">{t.specialized.worklog.tableEnd}</th>
            <th className="px-3 sm:px-4 py-3 text-left w-40 whitespace-nowrap">{t.specialized.worklog.tableRef}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-aws-darkest/40">
          {items.map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-aws-cardDark/50 transition-colors">
              <td className="px-3 sm:px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                {row.day}
              </td>
              <td className="px-3 sm:px-4 py-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                {row.task}
              </td>
              <td className="px-3 sm:px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono text-xs">
                {row.startDate}
              </td>
              <td className="px-3 sm:px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono text-xs">
                {row.completionDate}
              </td>
              <td className="px-3 sm:px-4 py-3 text-slate-500 dark:text-slate-400">
                {row.referenceUrl ? (
                  <a
                    href={row.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-aws-anchor dark:text-aws-teal hover:underline text-xs truncate max-w-[150px] inline-block"
                  >
                    {row.referenceLabel || row.referenceUrl}
                  </a>
                ) : (
                  <span className="text-slate-400 italic text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
