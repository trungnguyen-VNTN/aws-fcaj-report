import React from 'react';
import { siteConfig } from '../../config/site.config';
import { useLanguage } from '../../context/LanguageContext';
import { AwsLogo } from '../common/AwsLogo';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-aws-borderDark py-8 text-xs text-slate-500 dark:text-slate-400 no-print transition-colors">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <AwsLogo className="w-6 h-6 opacity-75" />
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              {siteConfig.site.title[language]}
            </p>
            <p className="text-[11px] text-slate-400">
              {siteConfig.student.fullName} • {siteConfig.student.company}
            </p>
          </div>
        </div>

        <div className="text-center md:text-right text-[11px]">
          <p>© {currentYear} First Cloud AI Journey (FCAJ). All rights reserved.</p>
          <p className="text-slate-400">
            AWS Well-Architected Framework • Cloud & AI Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};
