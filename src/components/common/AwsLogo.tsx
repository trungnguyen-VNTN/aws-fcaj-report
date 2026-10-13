import React from 'react';

export const AwsLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AWS FCAJ Logo"
    >
      <rect width="100" height="100" rx="20" fill="currentColor" className="text-aws-squid dark:text-aws-cardDark" />
      {/* Cloud Outline */}
      <path
        d="M32 64h36a14 14 0 0 0 4-27.4 18 18 0 0 0-34-6 12 12 0 0 0-6 23.4"
        stroke="#00A4BD"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AWS Smile Arrow */}
      <path
        d="M26 69c14 8 34 8 48 0"
        stroke="#FF9900"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M74 69l-4-6m4 6l-7 1"
        stroke="#FF9900"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Center AI Sparkle */}
      <circle cx="50" cy="45" r="3.5" fill="#FF9900" />
    </svg>
  );
};
