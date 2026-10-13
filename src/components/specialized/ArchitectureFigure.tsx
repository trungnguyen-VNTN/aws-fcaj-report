import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Lightbox } from '../markdown/Lightbox';
import { useLanguage } from '../../context/LanguageContext';
import { Network, Maximize2, ShieldAlert, Sparkles } from 'lucide-react';

interface ArchitectureFigureProps {
  src?: string;
  alt?: string;
  caption?: string;
  title?: string;
}

export const ArchitectureFigure: React.FC<ArchitectureFigureProps> = ({
  src,
  alt = 'AWS Personalized Nutrition E-Commerce Platform Architecture',
  caption,
  title = 'Architecture Diagram / Sơ đồ Kiến trúc Hệ thống',
}) => {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const basePath = import.meta.env.BASE_URL || '/';
  const normalizedSrc = src?.startsWith('/')
    ? `${basePath.replace(/\/$/, '')}${src}`
    : src;

  return (
    <div className="my-8 space-y-3">
      {/* Header bar with badges */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-aws-smile" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>
        <Badge variant="orange" size="md">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          {t.specialized.architecture.customDrawnBadge}
        </Badge>
      </div>

      {/* Frame */}
      {normalizedSrc ? (
        <Card
          onClick={() => setLightboxOpen(true)}
          className="relative overflow-hidden p-2 group cursor-pointer border-2 border-slate-200 dark:border-aws-borderDark hover:border-aws-smile/60 hover:shadow-glow-orange transition-all duration-300"
        >
          <img
            src={normalizedSrc}
            alt={alt}
            className="w-full h-auto object-contain rounded-lg max-h-[550px] mx-auto group-hover:scale-[1.01] transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-xs font-semibold backdrop-blur-md shadow-xl">
              <Maximize2 className="w-4 h-4 text-aws-smile" />
              <span>{t.specialized.architecture.clickToZoom}</span>
            </span>
          </div>
        </Card>
      ) : (
        /* Architecture Placeholder with strict instructions */
        <Card className="border-2 border-dashed border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-transparent p-8 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto text-aws-smile">
            <Network className="w-8 h-8" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Khung hiển thị Sơ đồ Kiến trúc (Chờ ảnh do bạn tự vẽ)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Theo quy định chấm điểm FCAJ: <strong>Không được dùng sơ đồ do AI tạo 100%</strong>. Sinh viên phải tự vẽ kiến trúc trên <em>draw.io</em> bằng bộ icon chính thức của AWS (Compute, VPC, Bedrock, DynamoDB...).
            </p>
          </div>

          <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-xs font-mono max-w-lg mx-auto flex items-center justify-center gap-2">
            <span>Thả ảnh vào:</span>
            <span className="text-amber-400 font-bold">public/images/architecture/system-overview.png</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Mục này là điều kiện tiên quyết để đạt điểm tối đa phần Kiến trúc & Proposal.</span>
          </div>
        </Card>
      )}

      {caption && (
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 italic">
          {caption}
        </p>
      )}

      {normalizedSrc && (
        <Lightbox
          src={normalizedSrc}
          alt={alt}
          caption={caption}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};
