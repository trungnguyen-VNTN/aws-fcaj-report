import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg border border-slate-200 dark:border-aws-borderDark bg-slate-100 dark:bg-aws-cardDark hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-aws-smile/50 min-h-[40px] min-w-[40px] flex items-center justify-center ${className}`}
      aria-label={isDark ? t.common.themeLight : t.common.themeDark}
      title={isDark ? t.common.themeLight : t.common.themeDark}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
};
