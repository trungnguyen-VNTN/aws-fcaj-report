import React from 'react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { AwsLogo } from '../components/common/AwsLogo';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { LanguageSwitch } from '../components/common/LanguageSwitch';
import { Sparkles, Terminal, Shield, ArrowRight } from 'lucide-react';

export const DevStyleguidePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-aws-deep text-slate-800 dark:text-slate-100 p-8 space-y-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-aws-borderDark pb-6">
        <div className="flex items-center gap-3">
          <AwsLogo className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              FCAJ Design System & Styleguide
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Internal verification dashboard for colors, typography, tokens, and atomic components.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>

      {/* Typography & Vietnamese Fonts */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aws-smile">1. Typography & Vietnamese Diacritics</h2>
        <Card className="space-y-4">
          <div>
            <p className="text-xs text-slate-400 font-mono mb-1">Font: Be Vietnam Pro (Display / Headings)</p>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Báo Cáo Thực Tập First Cloud AI Journey — Kiến Trúc Điện Toán Đám Mây & Trí Tuệ Nhân Tạo
            </h1>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mt-2">
              Hệ thống Thương mại Điện tử Dinh dưỡng Cá nhân hóa trên AWS (Serverless & Bedrock)
            </h2>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-mono mb-1">Body text (đầy đủ dấu tiếng Việt: ắ, ằ, ẳ, ẵ, ặ, ấ, ầ, ẩ, ẫ, ậ, ơ, ư, đ):</p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
              Chương trình thực tập FCAJ cung cấp nền tảng kiến thức vững chắc về các dịch vụ điện toán đám mây cốt lõi như VPC, EC2, S3, IAM và Amazon Bedrock. Các sinh viên trực tiếp thiết kế, triển khai giải pháp và tuân thủ chặt chẽ tiêu chuẩn AWS Well-Architected Framework nhằm tối ưu hóa chi phí, bảo mật và hiệu năng vận hành.
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-mono mb-1">Font: JetBrains Mono (Code & Numbering Badges)</p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto">
              <code>aws configure set region ap-southeast-1 &amp;&amp; aws sts get-caller-identity</code>
            </pre>
          </div>
        </Card>
      </section>

      {/* Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aws-smile">2. Color Tokens & Contrast Check</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-aws-deep border border-slate-700 mb-2" />
            <span className="font-semibold text-sm">Deep Navy</span>
            <span className="text-xs font-mono text-slate-400">#0F1B2D (Dark Bg)</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-aws-squid border border-slate-700 mb-2" />
            <span className="font-semibold text-sm">AWS Squid Ink</span>
            <span className="text-xs font-mono text-slate-400">#232F3E (Header/Card)</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-aws-smile mb-2" />
            <span className="font-semibold text-sm text-aws-smile">AWS Smile Orange</span>
            <span className="text-xs font-mono text-slate-400">#FF9900 (Accent)</span>
          </Card>
          <Card className="flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-lg bg-aws-teal mb-2" />
            <span className="font-semibold text-sm text-aws-teal">AWS Teal</span>
            <span className="text-xs font-mono text-slate-400">#00A4BD (Secondary)</span>
          </Card>
        </div>
      </section>

      {/* Component Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aws-smile">3. Atomic Components (Buttons & Badges)</h2>
        <Card className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400">Buttons:</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" icon={<Sparkles className="w-4 h-4" />}>
                Primary Button
              </Button>
              <Button variant="secondary" icon={<Terminal className="w-4 h-4" />}>
                Secondary
              </Button>
              <Button variant="outline" icon={<Shield className="w-4 h-4" />}>
                Outline
              </Button>
              <Button variant="ghost" icon={<ArrowRight className="w-4 h-4" />}>
                Ghost Action
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-400">Status Badges:</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="orange">5.3. Network & Security</Badge>
              <Badge variant="teal">AWS CloudFront</Badge>
              <Badge variant="green">Ready / Hoàn thiện</Badge>
              <Badge variant="amber">Draft / Bản nháp</Badge>
              <Badge variant="slate">Skeleton / Khung</Badge>
              <Badge variant="red">Notice Required</Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* Surfaces & Depth */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-aws-smile">4. Surfaces, Cards & Hover Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverEffect>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Interactive Card with Glow</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hover over this card to verify the smooth lift transition, soft shadow, and subtle AWS orange border glow.
            </p>
          </Card>
          <Card className="border-l-4 border-l-aws-smile">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Accent-Border Card</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Used for important milestone highlights, student profile credentials, and rubric tips.
            </p>
          </Card>
          <Card className="bg-gradient-to-br from-aws-cardDark to-aws-squid text-white">
            <h3 className="font-bold text-aws-smile mb-2">Gradient Mesh Surface</h3>
            <p className="text-xs text-slate-300">
              Modern dark backdrop surface providing high depth and contrast for charts and diagrams.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
};
