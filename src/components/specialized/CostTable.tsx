import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface CostRow {
  service: string;
  spec: string;
  demoCost: number; // in USD
  prodCost: number; // in USD
  notes: string;
}

interface CostTableProps {
  rows?: CostRow[];
}

const defaultCostRows: CostRow[] = [
  {
    service: 'Amazon VPC & NAT Gateway',
    spec: '1 VPC, 2 Public + 2 Private Subnets, 1 NAT GW (Demo) / 2 NAT GW (Prod)',
    demoCost: 0.0,
    prodCost: 65.7,
    notes: 'Demo dùng VPC Endpoints gateway miễn phí thay thế NAT Gateway',
  },
  {
    service: 'Amazon DynamoDB',
    spec: 'On-Demand Capacity Mode, 25GB Storage',
    demoCost: 0.0,
    prodCost: 12.5,
    notes: '25GB lưu trữ miễn phí hàng tháng thuộc gói Free Tier',
  },
  {
    service: 'AWS Lambda',
    spec: 'Serverless backend API, 1M requests/tháng, 512MB RAM',
    demoCost: 0.0,
    prodCost: 8.4,
    notes: '1,000,000 requests miễn phí hàng tháng vĩnh viễn (Always Free)',
  },
  {
    service: 'Amazon Bedrock (Claude 3.5 / Haiku)',
    spec: 'AI Nutrition Agent + Guardrails, 100k input / 50k output tokens',
    demoCost: 3.5,
    prodCost: 45.0,
    notes: 'Sử dụng Claude Haiku cho demo để tối ưu chi phí token tối đa',
  },
  {
    service: 'Amazon Cognito',
    spec: 'User Pools & Hosted UI, 1,000 MAUs',
    demoCost: 0.0,
    prodCost: 0.0,
    notes: '50,000 MAUs miễn phí hàng tháng thuộc gói Free Tier',
  },
  {
    service: 'Amazon S3 & CloudFront',
    spec: 'Static Frontend, OAC, 10GB Storage & 50GB Data Transfer',
    demoCost: 0.0,
    prodCost: 4.8,
    notes: '1TB Data Transfer out miễn phí vĩnh viễn từ CloudFront',
  },
  {
    service: 'Amazon EventBridge & SQS',
    spec: 'Custom Event Bus & DLQ, 200,000 events/tháng',
    demoCost: 0.0,
    prodCost: 1.2,
    notes: 'Nằm trọn trong gói AWS Free Tier',
  },
];

export const CostTable: React.FC<CostTableProps> = ({ rows = defaultCostRows }) => {
  const { t } = useLanguage();

  const totalDemo = rows.reduce((acc, curr) => acc + curr.demoCost, 0);
  const totalProd = rows.reduce((acc, curr) => acc + curr.prodCost, 0);

  return (
    <div className="my-8 space-y-3">
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-aws-smile" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {t.specialized.cost.title}
        </h3>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-aws-borderDark shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-aws-borderDark text-xs sm:text-sm">
          <thead className="bg-slate-50 dark:bg-aws-cardDark text-slate-700 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="px-4 py-3 text-left">{t.specialized.cost.service}</th>
              <th className="px-4 py-3 text-left">{t.specialized.cost.spec}</th>
              <th className="px-4 py-3 text-right whitespace-nowrap">{t.specialized.cost.demoCost}</th>
              <th className="px-4 py-3 text-right whitespace-nowrap">{t.specialized.cost.prodCost}</th>
              <th className="px-4 py-3 text-left">{t.specialized.cost.notes}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-aws-darkest/40">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-aws-cardDark/50 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  {row.service}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {row.spec}
                </td>
                <td className="px-4 py-3 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                  ${row.demoCost.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right font-mono font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  ${row.prodCost.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">
                  {row.notes}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-100/80 dark:bg-aws-cardDark border-t-2 border-slate-300 dark:border-aws-borderDark font-bold text-slate-900 dark:text-white">
            <tr>
              <td colSpan={2} className="px-4 py-3.5 uppercase tracking-wider text-xs">
                {t.specialized.cost.total}
              </td>
              <td className="px-4 py-3.5 text-right font-mono text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                ${totalDemo.toFixed(2)} / mo
              </td>
              <td className="px-4 py-3.5 text-right font-mono text-aws-smile text-sm whitespace-nowrap">
                ${totalProd.toFixed(2)} / mo
              </td>
              <td className="px-4 py-3.5 text-slate-400 text-xs font-normal">
                AWS Pricing Calculator Estimates
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic">
        <AlertCircle className="w-3.5 h-3.5 text-aws-smile shrink-0" />
        <span>{t.specialized.cost.freeTierNote}</span>
      </div>
    </div>
  );
};
