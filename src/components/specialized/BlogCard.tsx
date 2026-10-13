import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Calendar, ExternalLink, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface BlogItem {
  title: string;
  date: string;
  summary: string;
  image?: string;
  externalUrl?: string;
  tags?: string[];
}

export const BlogCard: React.FC<BlogItem> = ({
  title,
  date,
  summary,
  image,
  externalUrl,
  tags = ['AWS Cloud', 'First Cloud AI Journey'],
}) => {
  const { t } = useLanguage();

  return (
    <Card hoverEffect className="flex flex-col justify-between overflow-hidden group p-0">
      {/* Blog Thumbnail Frame */}
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-aws-darkest overflow-hidden border-b border-slate-200 dark:border-aws-borderDark">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-aws-cardDark dark:to-aws-deep">
            <BookOpen className="w-10 h-10 opacity-40 mb-2 text-aws-smile" />
            <span className="text-xs font-mono">Blog Cover Frame</span>
          </div>
        )}
      </div>

      {/* Blog Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-aws-smile transition-colors line-clamp-2">
            {title}
          </h4>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mt-2 leading-relaxed">
            {summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-aws-borderDark flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="slate" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-aws-smile hover:underline shrink-0"
            >
              <span>{t.specialized.blog.viewOnCommunity}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
