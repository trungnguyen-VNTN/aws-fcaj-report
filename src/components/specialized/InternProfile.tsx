import React, { useState } from 'react';
import { Mail, Phone, Github, Linkedin, Clock, GraduationCap, Building2, UserRound } from 'lucide-react';
import { siteConfig } from '../../config/site.config';
import { useLanguage } from '../../context/LanguageContext';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

/** Intern profile card built from src/config/site.config.ts (single source of truth). */
export const InternProfile: React.FC = () => {
  const { language, t } = useLanguage();
  const s = siteConfig.student;
  const labels = t.home.studentInfo;
  const [avatarFailed, setAvatarFailed] = useState(false);
  const initials = s.fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join('');

  const rows: { label: string; value?: string; icon: React.ReactNode }[] = [
    { label: labels.university, value: s.university, icon: <GraduationCap className="w-4 h-4" aria-hidden /> },
    { label: labels.major, value: s.major, icon: <GraduationCap className="w-4 h-4" aria-hidden /> },
    { label: labels.class, value: s.className, icon: <UserRound className="w-4 h-4" aria-hidden /> },
    { label: labels.company, value: s.company, icon: <Building2 className="w-4 h-4" aria-hidden /> },
    { label: labels.position, value: s.position, icon: <Building2 className="w-4 h-4" aria-hidden /> },
    { label: labels.period, value: s.internshipPeriod, icon: <Clock className="w-4 h-4" aria-hidden /> },
    { label: labels.mentor, value: s.mentor, icon: <UserRound className="w-4 h-4" aria-hidden /> },
  ];

  const contacts = [
    { label: labels.email, value: s.email, href: `mailto:${s.email}`, icon: <Mail className="w-4 h-4" aria-hidden /> },
    { label: labels.phone, value: s.phone, href: `tel:${s.phone}`, icon: <Phone className="w-4 h-4" aria-hidden /> },
    s.github && { label: 'GitHub', value: s.github.replace(/^https?:\/\//, ''), href: s.github, icon: <Github className="w-4 h-4" aria-hidden /> },
    s.linkedin && { label: 'LinkedIn', value: 'LinkedIn', href: s.linkedin, icon: <Linkedin className="w-4 h-4" aria-hidden /> },
  ].filter(Boolean) as { label: string; value: string; href: string; icon: React.ReactNode }[];

  return (
    <Card className="p-6 sm:p-8 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 mb-6 border-b border-slate-100 dark:border-aws-borderDark">
        {s.avatar && !avatarFailed ? (
          <img
            src={s.avatar}
            alt={s.fullName}
            width={96}
            height={96}
            onError={() => setAvatarFailed(true)}
            className="w-24 h-24 rounded-full object-cover border-2 border-aws-smile/60"
          />
        ) : (
          <div
            aria-hidden
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-extrabold bg-aws-smile/15 text-amber-700 dark:text-aws-smile border-2 border-aws-smile/60"
          >
            {initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{labels.fullName}</p>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{s.fullName}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="teal" size="sm">FCAJ Intern</Badge>
            <Badge variant="orange" size="sm">{siteConfig.site.workshopProject[language]}</Badge>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
        {rows
          .filter((r) => r.value)
          .map((r) => (
            <div key={r.label}>
              <dt className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                {r.icon}
                {r.label}
              </dt>
              <dd className="mt-1 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 break-words">{r.value}</dd>
            </div>
          ))}
      </dl>

      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-aws-borderDark grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-2 min-h-11 px-3 rounded-lg border border-slate-200 dark:border-aws-borderDark text-sm text-slate-700 dark:text-slate-200 hover:border-aws-smile/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-aws-smile transition-colors"
          >
            <span className="text-slate-500 dark:text-slate-400">{c.icon}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 w-28 shrink-0">{c.label}</span>
            <span className="font-medium break-all">{c.value}</span>
          </a>
        ))}
      </div>
    </Card>
  );
};
