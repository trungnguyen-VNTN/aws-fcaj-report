import React, { useState } from 'react';
import { Maximize2, Image as ImageIcon } from 'lucide-react';
import { Lightbox } from './Lightbox';
import { useLanguage } from '../../context/LanguageContext';

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
}

export const Figure: React.FC<FigureProps> = ({ src, alt, caption, width }) => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Normalize image src to handle base path if deployed on GitHub Pages
  const basePath = import.meta.env.BASE_URL || '/';
  const normalizedSrc = src.startsWith('/')
    ? `${basePath.replace(/\/$/, '')}${src}`
    : src;

  return (
    <>
      <figure className="my-6 mx-auto flex flex-col items-center group">
        <div
          onClick={() => !hasError && setLightboxOpen(true)}
          className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-aws-borderDark bg-slate-100 dark:bg-aws-cardDark shadow-md transition-all duration-300 ${
            !hasError ? 'cursor-pointer hover:border-aws-smile/60 hover:shadow-glow-orange' : ''
          }`}
          style={{ maxWidth: width || '100%' }}
        >
          {hasError ? (
            <div className="p-8 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <ImageIcon className="w-10 h-10 opacity-50" />
              <span className="text-xs font-mono">{alt || 'Image not found'}</span>
              <span className="text-[11px] text-amber-500">Đường dẫn: {src}</span>
            </div>
          ) : (
            <>
              <img
                src={normalizedSrc}
                alt={alt}
                loading="lazy"
                onError={() => setHasError(true)}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-medium backdrop-blur-sm shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t.specialized.architecture.clickToZoom}</span>
                </span>
              </div>
            </>
          )}
        </div>

        {caption && (
          <figcaption className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400 italic max-w-xl">
            {caption}
          </figcaption>
        )}
      </figure>

      <Lightbox
        src={normalizedSrc}
        alt={alt}
        caption={caption}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};
