import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CodeBlockProps {
  language?: string;
  filename?: string;
  value: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'bash', filename, value }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const lines = value.trimEnd().split('\n');

  return (
    <div className="relative my-5 rounded-xl border border-slate-700/80 bg-aws-darkest text-slate-100 overflow-hidden shadow-lg group">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-aws-smile" />
          <span className="text-slate-300 font-medium">
            {filename || (language ? `${language}` : 'code')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {language && (
            <span className="uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              {language}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-aws-smile"
            aria-label={t.common.copy}
            title={t.common.copy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-sans">{t.common.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] font-sans">{t.common.copy}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40">
                <td className="pr-4 text-right text-slate-600 select-none text-[11px] w-8 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre align-top text-slate-200">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
