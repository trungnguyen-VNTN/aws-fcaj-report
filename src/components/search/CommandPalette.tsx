import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, CornerDownLeft, FileText, ArrowRight } from 'lucide-react';
import { searchDocs, SearchResultItem } from '../../services/searchIndex';
import { useLanguage } from '../../context/LanguageContext';
import { reportManifest } from '../../config/structure';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown handler for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Execute search when query or language changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const hits = searchDocs(query, language);
      setResults(hits);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, language]);

  // Handle arrows and Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[selectedIndex];
      if (target) {
        navigate(target.route);
        onClose();
      }
    }
  };

  const handleSelect = (route: string) => {
    navigate(route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="command-palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-aws-cardDark border border-slate-200 dark:border-aws-borderDark rounded-2xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 divide-y divide-slate-100 dark:divide-aws-borderDark animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 gap-3">
          <Search className="w-5 h-5 text-aws-smile shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.common.searchPlaceholder}
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-slate-400 text-slate-900 dark:text-white"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-400">
              ESC
            </kbd>
          )}
        </div>

        {/* Results or Suggestions List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              <div className="space-y-1">
                {results.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.route)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-aws-smile/15 text-slate-900 dark:text-white'
                          : 'hover:bg-slate-50 dark:hover:bg-aws-borderDark/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <FileText
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isSelected ? 'text-aws-smile' : 'text-slate-400'
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            {item.pre && (
                              <span className="font-mono text-xs font-bold text-aws-smile">
                                {item.pre}
                              </span>
                            )}
                            <span className="font-semibold text-sm truncate">{item.title}</span>
                          </div>
                          {item.snippet && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {item.snippet}
                            </p>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <CornerDownLeft className="w-4 h-4 text-aws-smile shrink-0 ml-2 mt-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-slate-400">
                {t.common.noResults} &ldquo;{query}&rdquo;
              </div>
            )
          ) : (
            /* Quick Recommendations when search input is empty */
            <div className="p-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                {language === 'vi' ? 'Các mục báo cáo gợi ý truy cập nhanh:' : 'Quick Navigation Shortcuts:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {reportManifest.slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(`/${language}/${item.path}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200/80 dark:border-aws-borderDark/80 hover:border-aws-smile/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-left transition-colors text-xs"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="font-mono text-aws-smile font-bold">{item.pre}</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {item.title[language]}
                      </span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-aws-deep/60 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 font-mono bg-white dark:bg-slate-800 border rounded text-[10px] mr-1">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 font-mono bg-white dark:bg-slate-800 border rounded text-[10px] mr-1">
                ↓
              </kbd>
              to navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 font-mono bg-white dark:bg-slate-800 border rounded text-[10px] mr-1">
                ↵
              </kbd>
              to select
            </span>
          </div>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
