import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const SkipToContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-aws-smile text-aws-squid font-bold rounded-md shadow-lg outline-none ring-2 ring-white"
    >
      {t.common.skipToContent}
    </a>
  );
};
