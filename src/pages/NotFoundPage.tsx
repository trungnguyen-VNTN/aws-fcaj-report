import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/common/Button';
import { AwsLogo } from '../components/common/AwsLogo';

export const NotFoundPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <AwsLogo className="w-24 h-24 mx-auto opacity-30" />
        <span className="absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-aws-smile font-mono tracking-widest drop-shadow-md">
          404
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
        {t.notFound.title}
      </h1>
      <p className="text-base font-medium text-slate-600 dark:text-slate-300 max-w-md mb-2">
        {t.notFound.subtitle}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-8">
        {t.notFound.description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to={`/${language}`}>
          <Button variant="primary" icon={<Home className="w-4 h-4" />}>
            {t.notFound.homeButton}
          </Button>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-aws-borderDark rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>{language === 'vi' ? 'Quay lại trang trước' : 'Go Back'}</span>
        </button>
      </div>
    </div>
  );
};
