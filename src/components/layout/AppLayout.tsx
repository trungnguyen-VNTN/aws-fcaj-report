import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReadingProgressBar } from '../common/ReadingProgressBar';
import { SkipToContent } from '../common/SkipToContent';
import { CommandPalette } from '../search/CommandPalette';

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-aws-deep text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <SkipToContent />
      <ReadingProgressBar />

      {/* Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0 transition-all duration-300">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* Global Command Palette Search Modal */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};
