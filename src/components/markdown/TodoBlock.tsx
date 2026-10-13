import React from 'react';
import { AlertCircle, CheckSquare } from 'lucide-react';

interface TodoBlockProps {
  title?: string;
  children: React.ReactNode;
}

export const TodoBlock: React.FC<TodoBlockProps> = ({ title, children }) => {
  return (
    <div className="my-6 rounded-xl border-2 border-dashed border-amber-400 bg-amber-500/10 dark:bg-amber-500/15 p-4 sm:p-5 text-amber-900 dark:text-amber-200 transition-colors">
      <div className="flex items-start gap-3">
        <CheckSquare className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-xs uppercase tracking-wider bg-amber-500 text-slate-900 px-2 py-0.5 rounded">
              TODO / CẦN ĐIỀN
            </span>
            <span className="font-semibold text-sm">
              {title || 'Chỗ cần hoàn thiện nội dung'}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed font-sans">
            {children}
          </div>
          <div className="mt-2.5 pt-2 border-t border-amber-400/30 flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 font-mono">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Lưu ý: Khối này sẽ làm `npm run build:release` báo lỗi nếu chưa xóa trước khi nộp bài.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
