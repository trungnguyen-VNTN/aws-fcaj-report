import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations, Language, Translations } from '../i18n/translations';
import { siteConfig } from '../config/site.config';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  switchLanguage: (targetLang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect language from URL pathname or default
  const detectLangFromUrl = (): Language => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'vi') {
      return segments[0] as Language;
    }
    return siteConfig.site.defaultLanguage || 'vi';
  };

  const [language, setLanguageState] = useState<Language>(detectLangFromUrl);

  // Sync state when URL pathname changes
  useEffect(() => {
    const langFromUrl = detectLangFromUrl();
    if (langFromUrl !== language) {
      setLanguageState(langFromUrl);
    }
  }, [location.pathname]);

  const switchLanguage = (targetLang: Language) => {
    if (targetLang === language) return;

    const segments = location.pathname.split('/').filter(Boolean);
    let newPath = '';

    if (segments.length === 0) {
      newPath = `/${targetLang}`;
    } else if (segments[0] === 'en' || segments[0] === 'vi') {
      segments[0] = targetLang;
      newPath = `/${segments.join('/')}`;
    } else {
      newPath = `/${targetLang}/${segments.join('/')}`;
    }

    setLanguageState(targetLang);
    navigate(newPath + location.search + location.hash);
  };

  const setLanguage = (lang: Language) => {
    switchLanguage(lang);
  };

  const t = useMemo(() => translations[language], [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
