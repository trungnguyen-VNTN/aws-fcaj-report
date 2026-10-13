import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { reportManifest } from '../../config/structure';
import { useLanguage } from '../../context/LanguageContext';
import { siteConfig } from '../../config/site.config';
import { AwsLogo } from '../common/AwsLogo';
import {
  ChevronDown,
  ChevronRight,
  Search,
  ExternalLink,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  BookOpen,
  Users,
  Boxes,
  Award,
  MessageSquareHeart,
  CalendarDays,
  FileText,
  UserCheck,
  Network,
  Wrench,
  ShieldCheck,
  Database,
  KeyRound,
  Cpu,
  Zap,
  Globe,
  GitBranch,
  PlayCircle,
  DollarSign,
  Trash2,
  Sparkles,
  LucideIcon,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

// Icon mapper
const iconMap: Record<string, LucideIcon> = {
  Calendar,
  FileSpreadsheet,
  BookOpen,
  Users,
  Boxes,
  Award,
  MessageSquareHeart,
  CalendarDays,
  FileText,
  UserCheck,
  Network,
  Wrench,
  ShieldCheck,
  Database,
  KeyRound,
  Cpu,
  Zap,
  Globe,
  GitBranch,
  PlayCircle,
  DollarSign,
  Trash2,
  Sparkles,
  CheckCircle2,
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { language, t } = useLanguage();
  const location = useLocation();

  // Collapsed sections map
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    '1-worklog': true,
    '3-blogs': true,
    '4-events': true,
    '5-workshop': true,
  });

  // Visited pages tracking
  const [visitedPages, setVisitedPages] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fcaj_visited_pages');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Mark current route as visited
  useEffect(() => {
    const cleanPath = location.pathname.replace(/^\/(en|vi)\/?/, '');
    if (cleanPath && !visitedPages.includes(cleanPath)) {
      const updated = [...visitedPages, cleanPath];
      setVisitedPages(updated);
      try {
        localStorage.setItem('fcaj_visited_pages', JSON.stringify(updated));
      } catch {}
    }
  }, [location.pathname]);

  const toggleGroup = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentCleanPath = location.pathname.replace(/^\/(en|vi)\/?/, '');

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 lg:w-72 bg-white/95 dark:bg-aws-deep/95 backdrop-blur-md border-r border-slate-200 dark:border-aws-borderDark flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 dark:border-aws-borderDark shrink-0">
          <Link
            to={`/${language}`}
            onClick={onClose}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-aws-smile/40 rounded-lg p-1"
          >
            <AwsLogo className="w-8 h-8 group-hover:scale-105 transition-transform shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-aws-smile transition-colors truncate">
                AWS FCAJ Report
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {language === 'vi' ? 'Hồ sơ Thực tập FCAJ' : 'Internship Portfolio'}
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Button */}
        <div className="p-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-aws-cardDark border border-slate-200 dark:border-aws-borderDark rounded-lg hover:border-aws-smile/60 hover:text-slate-800 dark:hover:text-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-aws-smile/50"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.common.searchPlaceholder}</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded shadow-sm text-slate-500">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Navigation Tree */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 text-sm select-none" aria-label="Documentation navigation">
          {reportManifest.map((item) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isExpanded = expandedGroups[item.id] ?? true;
            const isGroupActive = currentCleanPath.startsWith(item.path);
            const isDirectActive = currentCleanPath === item.path;
            const isVisited = visitedPages.includes(item.path);
            const Icon = (item.iconName && iconMap[item.iconName]) || Boxes;

            return (
              <div key={item.id} className="space-y-0.5">
                <div
                  className={`group flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isDirectActive
                      ? 'bg-aws-smile text-aws-squid font-bold shadow-sm'
                      : isGroupActive
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Link
                    to={`/${language}/${item.path}`}
                    onClick={onClose}
                    className="flex items-center gap-2 flex-1 min-w-0"
                  >
                    <Icon className="w-4 h-4 shrink-0 opacity-80" />
                    <span className="shrink-0 font-mono text-[11px] text-aws-smile dark:text-amber-400">
                      {item.pre}
                    </span>
                    <span className="truncate">{item.title[language]}</span>
                  </Link>

                  <div className="flex items-center gap-1 shrink-0 ml-1">
                    {isVisited && !isDirectActive && (
                      <span title={t.common.visited} className="text-emerald-500">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}

                    {hasChildren && (
                      <button
                        onClick={(e) => toggleGroup(item.id, e)}
                        className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Submenu Items */}
                {hasChildren && isExpanded && (
                  <div className="ml-4 pl-2 border-l border-slate-200 dark:border-aws-borderDark space-y-0.5 my-1">
                    {item.children!.map((child) => {
                      const isChildActive = currentCleanPath === child.path;
                      const isChildVisited = visitedPages.includes(child.path);
                      const ChildIcon = (child.iconName && iconMap[child.iconName]) || FileText;

                      return (
                        <Link
                          key={child.id}
                          to={`/${language}/${child.path}`}
                          onClick={onClose}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors ${
                            isChildActive
                              ? 'bg-aws-smile text-aws-squid font-bold shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          <span className="flex items-center gap-1.5 min-w-0">
                            <ChildIcon className="w-3 h-3 shrink-0 opacity-60" />
                            <span className="font-mono text-[10px] text-slate-400 shrink-0">
                              {child.pre}
                            </span>
                            <span className="truncate">{child.title[language]}</span>
                          </span>
                          {isChildVisited && !isChildActive && (
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0 ml-1" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Links (AWS Community & Docs) */}
        <div className="p-3 border-t border-slate-200 dark:border-aws-borderDark shrink-0 bg-slate-50/50 dark:bg-aws-cardDark/50 text-xs space-y-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
            {t.common.links}
          </div>
          <a
            href={siteConfig.links.awsStudyGroupBlog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-aws-smile transition-colors rounded"
          >
            <span className="truncate">AWS Study Group Blog</span>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
          </a>
          <a
            href={siteConfig.links.awsStudyGroupFacebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-aws-smile transition-colors rounded"
          >
            <span className="truncate">AWS SG Community</span>
            <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
          </a>
        </div>
      </aside>
    </>
  );
};
