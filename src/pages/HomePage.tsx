import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site.config';
import { reportManifest } from '../config/structure';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ReportProgressBar } from '../components/specialized/ReportProgressBar';
import { AwsLogo } from '../components/common/AwsLogo';
import { isRouteCompleted } from '../services/contentLoader';
import {
  Calendar,
  FileSpreadsheet,
  BookOpen,
  Users,
  Boxes,
  Award,
  MessageSquareHeart,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Clock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  LucideIcon,
  ChevronRight,
} from 'lucide-react';

const sectionIconMap: Record<string, LucideIcon> = {
  '1-worklog': Calendar,
  '2-proposal': FileSpreadsheet,
  '3-blogs': BookOpen,
  '4-events': Users,
  '5-workshop': Boxes,
  '6-self-evaluation': Award,
  '7-feedback': MessageSquareHeart,
};

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { student, site } = siteConfig;

  return (
    <div className="space-y-12 py-4 animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-aws-borderDark bg-white/70 dark:bg-aws-cardDark/70 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-card-light dark:shadow-card-dark bg-mesh-subtle">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.home.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            {site.title[language]}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {site.subtitle[language]} — {site.workshopProject[language]}.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to={`/${language}/1-worklog`}>
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                {t.home.viewDocs}
              </Button>
            </Link>

            <Link to={`/${language}/5-workshop`}>
              <Button variant="outline" size="lg" icon={<Boxes className="w-4 h-4 text-aws-smile" />}>
                {language === 'vi' ? 'Xem Workshop Kỹ thuật' : 'Explore Workshop'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress & Student Profile Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Profile Card (2 cols on lg) */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col justify-between p-6 sm:p-8 border-l-4 border-l-aws-smile">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-aws-smile" />
                  <h3 className="font-bold text-base uppercase tracking-wider text-slate-900 dark:text-white">
                    {t.home.studentCardTitle}
                  </h3>
                </div>
                <Badge variant="teal" size="sm">
                  FCAJ Intern
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.fullName}</span>
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    {student.fullName}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.position}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {student.position}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.company}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {student.company}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.period}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-aws-smile" />
                    <span>{student.internshipPeriod}</span>
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.university}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {student.university} ({student.className})
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.major}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {student.major}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.email}</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{student.email}</span>
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-xs">{t.home.studentInfo.mentor}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {student.mentor}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-aws-borderDark flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Chỉnh sửa thông tin tại: <code className="font-mono text-aws-smile">src/config/site.config.ts</code></span>
              </span>
            </div>
          </Card>
        </div>

        {/* Completion Progress widget */}
        <div className="flex flex-col justify-between space-y-6">
          <ReportProgressBar />

          {/* Quick Stats Card */}
          <Card className="flex-1 flex flex-col justify-center p-6 bg-gradient-to-br from-aws-cardDark to-aws-deep text-white">
            <div className="flex items-center gap-2 mb-3">
              <AwsLogo className="w-7 h-7" />
              <span className="font-bold text-sm text-aws-smile">Well-Architected Compliance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Khung báo cáo được cấu hình sẵn các quy tắc kiểm tra nghiêm ngặt: Parity song ngữ, 12 tuần Worklog, bảng chi phí Cost Table và sơ đồ kiến trúc tự vẽ.
            </p>
          </Card>
        </div>
      </section>

      {/* 7 Report Section Cards Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.home.sectionsTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.home.sectionsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reportManifest.map((item) => {
            const Icon = sectionIconMap[item.id] || Boxes;
            const isCompleted = isRouteCompleted(language, item.path);

            return (
              <Link
                key={item.id}
                to={`/${language}/${item.path}`}
                className="group block"
              >
                <Card hoverEffect className="h-full flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 flex items-center justify-center text-aws-smile group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-aws-smile">
                          {item.pre}
                        </span>
                        {isCompleted ? (
                          <Badge variant="green" size="sm">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {t.common.ready}
                          </Badge>
                        ) : (
                          <Badge variant="amber" size="sm">
                            {t.common.skeleton}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-aws-smile transition-colors mb-2">
                      {item.title[language]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {item.description?.[language]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-aws-borderDark flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-aws-smile transition-colors">
                    <span>
                      {item.children?.length ? `${item.children.length} ${language === 'vi' ? 'mục con' : 'sub-items'}` : (language === 'vi' ? 'Xem nội dung' : 'Explore section')}
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
