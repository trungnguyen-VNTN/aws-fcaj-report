import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
}) => {
  const hoverStyles = hoverEffect
    ? 'hover:-translate-y-1 hover:border-aws-smile/60 hover:shadow-glow-orange cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-aws-cardDark border border-slate-200 dark:border-aws-borderDark rounded-xl p-5 shadow-card-light dark:shadow-card-dark transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};
