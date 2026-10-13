import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { isRouteCompleted } from '../../services/contentLoader';

export const WorklogTimeline: React.FC = () => {
  const { language, t } = useLanguage();

  const weeks = Array.from({ length: 12 }, (_, i) => {
    const weekNum = i + 1;
    const path = `1-worklog/1.${weekNum}-week${weekNum}`;
    const isCompleted = isRouteCompleted(language, path);

    return {
      weekNum,
      path,
      isCompleted,
      title: language === 'vi' ? `Tuần ${weekNum}` : `Week ${weekNum}`,
      description:
        language === 'vi'
          ? `Nhật ký công việc, tiến độ hàng ngày và kết quả tuần ${weekNum}.`
          : `Daily worklog, task execution, and achievements for week ${weekNum}.`,
    };
  });

  return (
    <div className="space-y-6 my-8">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-aws-smile" />
          <span>{t.specialized.worklog.timelineTitle}</span>
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.specialized.worklog.timelineSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {weeks.map((week) => (
          <Link
            key={week.weekNum}
            to={`/${language}/${week.path}`}
            className="group block"
          >
            <Card hoverEffect className="h-full flex flex-col justify-between p-4 relative overflow-hidden">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    1.{week.weekNum}.
                  </span>
                  {week.isCompleted ? (
                    <Badge variant="green" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {t.specialized.worklog.statusDone}
                    </Badge>
                  ) : (
                    <Badge variant="amber" size="sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {t.specialized.worklog.statusEmpty}
                    </Badge>
                  )}
                </div>

                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-aws-smile transition-colors">
                  {week.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {week.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-aws-borderDark flex items-center justify-between text-xs text-slate-400 group-hover:text-aws-smile transition-colors">
                <span>{language === 'vi' ? 'Xem chi tiết' : 'View Worklog'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
