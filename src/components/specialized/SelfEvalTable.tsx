import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Award, CheckCircle } from 'lucide-react';

interface EvaluationItem {
  id: number;
  nameVi: string;
  nameEn: string;
  rating: 'good' | 'fair' | 'average';
  notesVi: string;
  notesEn: string;
}

const defaultCriteria: EvaluationItem[] = [
  {
    id: 1,
    nameVi: '1. Kiến thức chuyên môn (AWS Cloud, Serverless, AI & Bedrock)',
    nameEn: '1. Technical Expertise (AWS Cloud, Serverless, AI & Bedrock)',
    rating: 'good',
    notesVi: 'Nắm vững kiến trúc Well-Architected, dịch vụ VPC, Bedrock Guardrails và CDK/CLI.',
    notesEn: 'Strong grasp of Well-Architected Framework, VPC, Bedrock Guardrails, and CDK/CLI.',
  },
  {
    id: 2,
    nameVi: '2. Năng lực tự học & nghiên cứu công nghệ mới',
    nameEn: '2. Self-learning & Researching Emerging Tech',
    rating: 'good',
    notesVi: 'Tự chủ động đào sâu tài liệu AWS Docs, Whitepapers và hoàn thành các bài lab khó.',
    notesEn: 'Proactively studied AWS Docs, official Whitepapers, and completed complex labs.',
  },
  {
    id: 3,
    nameVi: '3. Tinh thần chủ động & trách nhiệm trong công việc',
    nameEn: '3. Proactiveness & Accountability',
    rating: 'good',
    notesVi: 'Luôn hoàn thành đúng hạn các mốc Worklog, báo cáo tuần và chủ động hỏi mentor.',
    notesEn: 'Consistently met all weekly worklog milestones and proactively engaged mentors.',
  },
  {
    id: 4,
    nameVi: '4. Kỷ luật & Tuân thủ quy định thực tập FCAJ',
    nameEn: '4. Discipline & Compliance with FCAJ Regulations',
    rating: 'good',
    notesVi: 'Tuân thủ nghiêm túc giờ giấc, quy định bảo mật thông tin và đạo đức kỹ thuật.',
    notesEn: 'Strictly adhered to schedules, data security policies, and technical integrity.',
  },
  {
    id: 5,
    nameVi: '5. Kỹ năng giao tiếp & trình bày kỹ thuật',
    nameEn: '5. Technical Communication & Presentation',
    rating: 'good',
    notesVi: 'Viết bài blog rõ ràng, tài liệu hóa hệ thống mạch lạc, diễn đạt logic.',
    notesEn: 'Authored clear blog posts, well-structured docs, and delivered clear demos.',
  },
  {
    id: 6,
    nameVi: '6. Tinh thần làm việc nhóm & hỗ trợ cộng đồng',
    nameEn: '6. Teamwork & Community Collaboration',
    rating: 'good',
    notesVi: 'Tích cực chia sẻ trên AWS Study Group và hỗ trợ đồng đội trong các buổi workshop.',
    notesEn: 'Actively contributed to AWS Study Group community and supported teammates.',
  },
  {
    id: 7,
    nameVi: '7. Năng lực giải quyết vấn đề (Troubleshooting & Debugging)',
    nameEn: '7. Problem Solving & Troubleshooting',
    rating: 'good',
    notesVi: 'Biết cách đọc log CloudWatch, tra mã lỗi CLI và khắc phục sự cố mạng/IAM nhanh.',
    notesEn: 'Skilled in inspecting CloudWatch logs, troubleshooting CLI errors and IAM issues.',
  },
  {
    id: 8,
    nameVi: '8. Chất lượng & đóng góp vào sản phẩm Workshop cuối khóa',
    nameEn: '8. Workshop Deliverables Quality & Contribution',
    rating: 'good',
    notesVi: 'Triển khai trọn vẹn dự án Personalized Nutrition E-Commerce với AI Agent an toàn.',
    notesEn: 'Delivered an end-to-end Personalized Nutrition E-Commerce solution with AI Agents.',
  },
];

export const SelfEvalTable: React.FC = () => {
  const { language, t } = useLanguage();
  const [items, setItems] = useState<EvaluationItem[]>(() => {
    try {
      const saved = localStorage.getItem('fcaj_self_eval');
      return saved ? JSON.parse(saved) : defaultCriteria;
    } catch {
      return defaultCriteria;
    }
  });

  const handleRatingChange = (id: number, rating: 'good' | 'fair' | 'average') => {
    const updated = items.map((item) => (item.id === id ? { ...item, rating } : item));
    setItems(updated);
    try {
      localStorage.setItem('fcaj_self_eval', JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="my-8 space-y-4">
      <div className="flex items-center gap-2">
        <Award className="w-5 h-5 text-aws-smile" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {t.specialized.selfEval.criteria}
        </h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-aws-borderDark shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-aws-borderDark text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-aws-cardDark text-slate-700 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-4 py-3 text-left w-1/3">Tiêu chí (Criteria)</th>
              <th className="px-3 py-3 text-center w-20">{t.specialized.selfEval.good}</th>
              <th className="px-3 py-3 text-center w-20">{t.specialized.selfEval.fair}</th>
              <th className="px-3 py-3 text-center w-20">{t.specialized.selfEval.average}</th>
              <th className="px-4 py-3 text-left">{t.specialized.selfEval.notes}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-aws-darkest/40">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-aws-cardDark/50 transition-colors">
                <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-200">
                  {language === 'vi' ? row.nameVi : row.nameEn}
                </td>
                <td className="px-3 py-3.5 text-center">
                  <input
                    type="radio"
                    name={`rating-${row.id}`}
                    checked={row.rating === 'good'}
                    onChange={() => handleRatingChange(row.id, 'good')}
                    className="w-4 h-4 text-emerald-500 accent-emerald-500 cursor-pointer"
                  />
                </td>
                <td className="px-3 py-3.5 text-center">
                  <input
                    type="radio"
                    name={`rating-${row.id}`}
                    checked={row.rating === 'fair'}
                    onChange={() => handleRatingChange(row.id, 'fair')}
                    className="w-4 h-4 text-amber-500 accent-amber-500 cursor-pointer"
                  />
                </td>
                <td className="px-3 py-3.5 text-center">
                  <input
                    type="radio"
                    name={`rating-${row.id}`}
                    checked={row.rating === 'average'}
                    onChange={() => handleRatingChange(row.id, 'average')}
                    className="w-4 h-4 text-blue-500 accent-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3.5 text-slate-600 dark:text-slate-300 text-xs">
                  {language === 'vi' ? row.notesVi : row.notesEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
        <span>Bảng tự đánh giá có thể tương tác chọn mức độ và tự lưu vào bộ nhớ trình duyệt.</span>
      </div>
    </div>
  );
};
