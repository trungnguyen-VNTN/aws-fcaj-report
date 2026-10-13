import React from 'react';
import { Info, AlertTriangle, Lightbulb, AlertCircle, LucideIcon } from 'lucide-react';

export type NoticeType = 'note' | 'info' | 'tip' | 'warning';

interface NoticeProps {
  type?: NoticeType;
  title?: string;
  children: React.ReactNode;
}

const noticeConfig: Record<NoticeType, { icon: LucideIcon; border: string; bg: string; titleColor: string; defaultTitle: string }> = {
  note: {
    icon: Info,
    border: 'border-l-4 border-l-slate-400 dark:border-l-slate-500 border-slate-200 dark:border-aws-borderDark',
    bg: 'bg-slate-100/70 dark:bg-slate-800/40',
    titleColor: 'text-slate-700 dark:text-slate-200',
    defaultTitle: 'NOTE',
  },
  info: {
    icon: AlertCircle,
    border: 'border-l-4 border-l-blue-500 border-blue-200 dark:border-blue-900/50',
    bg: 'bg-blue-50/70 dark:bg-blue-950/20',
    titleColor: 'text-blue-800 dark:text-blue-300',
    defaultTitle: 'INFO',
  },
  tip: {
    icon: Lightbulb,
    border: 'border-l-4 border-l-teal-500 border-teal-200 dark:border-teal-900/50',
    bg: 'bg-teal-50/70 dark:bg-teal-950/20',
    titleColor: 'text-teal-800 dark:text-teal-300',
    defaultTitle: 'TIP',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-l-4 border-l-amber-500 border-amber-200 dark:border-amber-900/50',
    bg: 'bg-amber-50/70 dark:bg-amber-950/20',
    titleColor: 'text-amber-800 dark:text-amber-300',
    defaultTitle: 'WARNING',
  },
};

export const Notice: React.FC<NoticeProps> = ({ type = 'info', title, children }) => {
  const config = noticeConfig[type] || noticeConfig.info;
  const Icon = config.icon;

  return (
    <div className={`my-5 rounded-xl border p-4 ${config.border} ${config.bg} text-sm transition-colors`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.titleColor}`} />
        <div className="min-w-0 flex-1">
          <div className={`font-bold uppercase tracking-wider text-xs mb-1 ${config.titleColor}`}>
            {title || config.defaultTitle}
          </div>
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
