import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Calendar, MapPin, User, ExternalLink, Camera, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface EventItem {
  title: string;
  date: string;
  location: string;
  role: string;
  checkinPhoto?: string;
  summary: string;
  eventUrl?: string;
}

export const EventCard: React.FC<EventItem> = ({
  title,
  date,
  location,
  role,
  checkinPhoto,
  summary,
  eventUrl,
}) => {
  const { t } = useLanguage();

  return (
    <Card hoverEffect className="flex flex-col justify-between overflow-hidden group p-0">
      {/* Event Photo / Face Check-in Slot */}
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-aws-darkest overflow-hidden border-b border-slate-200 dark:border-aws-borderDark">
        {checkinPhoto ? (
          <img
            src={checkinPhoto}
            alt={`${title} - Check-in`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-aws-cardDark dark:to-aws-deep text-center">
            <Camera className="w-10 h-10 opacity-40 mb-2 text-aws-teal" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Khung ảnh Check-in Sự kiện
            </span>
            <span className="text-[11px] text-amber-500 font-medium mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Quy định FCAJ: Yêu cầu ảnh check-in rõ mặt
            </span>
          </div>
        )}

        <div className="absolute top-2 right-2">
          <Badge variant="teal" size="sm">
            {role}
          </Badge>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-aws-smile transition-colors">
            {title}
          </h4>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-aws-borderDark flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <User className="w-3.5 h-3.5" />
            <span>Vai trò: <strong className="text-slate-700 dark:text-slate-300">{role}</strong></span>
          </div>

          {eventUrl && (
            <a
              href={eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-aws-smile hover:underline"
            >
              <span>{t.specialized.event.viewPost}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
