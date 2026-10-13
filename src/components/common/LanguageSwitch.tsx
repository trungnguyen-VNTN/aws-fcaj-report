import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center p-1 rounded-lg border border-slate-200 dark:border-aws-borderDark bg-slate-100 dark:bg-aws-cardDark text-xs font-semibold ${className}`}>
      <span className="sr-only">Select language</span>
      <Languages className="w-3.5 h-3.5 mr-1.5 ml-1 text-slate-400" />
      <button
        onClick={() => switchLanguage('vi')}
        className={`px-2.5 py-1 rounded-md transition-all ${
          language === 'vi'
            ? 'bg-aws-smile text-aws-squid font-bold shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
        aria-pressed={language === 'vi'}
      >
        VI
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2.5 py-1 rounded-md transition-all ${
          language === 'en'
            ? 'bg-aws-smile text-aws-squid font-bold shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
};
