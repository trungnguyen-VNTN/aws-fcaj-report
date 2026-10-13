import React, { useState } from 'react';

export interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface TabsProps {
  items?: TabItem[];
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ items, children }) => {
  // If items provided directly
  const [activeIndex, setActiveIndex] = useState(0);

  if (items && items.length > 0) {
    return (
      <div className="my-6 rounded-xl border border-slate-200 dark:border-aws-borderDark bg-white dark:bg-aws-cardDark overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200 dark:border-aws-borderDark bg-slate-50 dark:bg-aws-darkest/60 overflow-x-auto">
          {items.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-[2px] ${
                activeIndex === idx
                  ? 'border-aws-smile text-aws-smile font-bold bg-white dark:bg-aws-cardDark'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="p-4 sm:p-5">
          {items[activeIndex]?.content}
        </div>
      </div>
    );
  }

  // Otherwise render wrapped children
  return (
    <div className="my-6 rounded-xl border border-slate-200 dark:border-aws-borderDark bg-white dark:bg-aws-cardDark p-4 shadow-sm">
      {children}
    </div>
  );
};
