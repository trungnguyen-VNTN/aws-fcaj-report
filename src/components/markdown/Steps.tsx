import React from 'react';

export interface StepItem {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

interface StepsProps {
  steps?: StepItem[];
  children?: React.ReactNode;
}

export const Steps: React.FC<StepsProps> = ({ steps, children }) => {
  if (steps && steps.length > 0) {
    return (
      <div className="my-8 relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-aws-borderDark">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-6 sm:-left-8 top-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-aws-smile text-aws-squid font-mono font-bold text-xs shadow-md">
              {idx + 1}
            </div>
            <div className="pt-0.5">
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h4>
              {step.description && (
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  {step.description}
                </p>
              )}
              {step.children}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-8 relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[11px] sm:before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-aws-borderDark">
      {children}
    </div>
  );
};
