import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { siteConfig } from './config/site.config';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { DocPage } from './pages/DocPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DevStyleguidePage } from './pages/DevStyleguidePage';

/**
 * Validate that language param is either 'en' or 'vi'
 */
const LangGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useParams();
  if (lang !== 'en' && lang !== 'vi') {
    return <Navigate to={`/${siteConfig.site.defaultLanguage}`} replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  const defaultLang = siteConfig.site.defaultLanguage || 'vi';

  return (
    <Routes>
      {/* Root redirect to default language */}
      <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />

      {/* Internal developer styleguide */}
      <Route path="/dev/styleguide" element={<DevStyleguidePage />} />

      {/* Document routes with language prefix */}
      <Route
        path="/:lang"
        element={
          <LangGuard>
            <AppLayout />
          </LangGuard>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="*" element={<DocPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
