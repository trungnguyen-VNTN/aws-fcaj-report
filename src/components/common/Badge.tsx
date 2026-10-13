import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'orange' | 'teal' | 'slate' | 'green' | 'amber' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'orange',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-md border tracking-wide transition-colors';

  const variants = {
    orange: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    teal: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30',
    slate: 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40',
    red: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
  };

  const sizes = {
    sm: 'text-[11px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
