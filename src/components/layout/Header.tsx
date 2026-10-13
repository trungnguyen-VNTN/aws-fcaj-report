import React from 'react';
import { Menu, Search, Github, Printer } from 'lucide-react';
import { Breadcrumb } from '../common/Breadcrumb';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { ThemeToggle } from '../common/ThemeToggle';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/site.config';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onOpenSearch }) => {
  const { t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-white/80 dark:bg-aws-deep/80 backdrop-blur-md border-b border-slate-200 dark:border-aws-borderDark px-4 lg:px-8 flex items-center justify-between gap-4 transition-colors">
      {/* Left section: Hamburger button & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-aws-smile/50"
          aria-label="Toggle sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block min-w-0">
          <Breadcrumb />
        </div>
      </div>

      {/* Right section: Search, Lang switch, Theme toggle, Quick actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick search button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-aws-cardDark border border-slate-200 dark:border-aws-borderDark rounded-lg hover:border-aws-smile/60 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          title={t.common.searchPlaceholder}
          aria-label={t.common.search}
        >
          <Search className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">{t.common.search}</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-sm">
            ⌘K
          </kbd>
        </button>

        {/* Print button */}
        <button
          onClick={handlePrint}
          className="hidden md:flex p-2 rounded-lg border border-slate-200 dark:border-aws-borderDark text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Print Document (PDF)"
          aria-label="Print Document"
        >
          <Printer className="w-4 h-4" />
        </button>

        {/* GitHub link */}
        {siteConfig.site.githubUser && (
          <a
            href={`https://github.com/${siteConfig.site.githubUser}/${siteConfig.site.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex p-2 rounded-lg border border-slate-200 dark:border-aws-borderDark text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        )}

        {/* Language switch */}
        <LanguageSwitch />

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};
