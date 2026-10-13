import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-aws-smile hover:bg-aws-smile-hover text-aws-squid font-semibold shadow-sm focus:ring-aws-smile/50',
    secondary: 'bg-slate-200 hover:bg-slate-300 dark:bg-aws-borderDark dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 focus:ring-slate-400',
    outline: 'border border-slate-300 dark:border-aws-borderDark hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-aws-smile/40',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-300 focus:ring-slate-400',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[42px]',
    lg: 'text-base px-5 py-2.5 gap-2.5 min-h-[48px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
