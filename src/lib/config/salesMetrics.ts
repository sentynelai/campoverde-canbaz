import { DollarSign, TrendingUp, PieChart, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SalesMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const TOTAL_US_SALES = 441800000000;
const CAMPOVERDE_SALES = 12271732.65;

const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(1)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`;
  }
  return `$${num.toLocaleString()}`;
};

const calculatePercentage = (part: number, total: number): string => {
  const percentage = (part * 100) / total;
  return `${percentage.toFixed(4)}%`;
};

export const getSalesMetrics = (): SalesMetric[] => [
  {
    label: 'Total Walmart Sales',
    value: formatLargeNumber(TOTAL_US_SALES),
    icon: DollarSign,
    color: '#00FF9C'
  },
  {
    label: 'Campoverde Sales',
    value: formatLargeNumber(CAMPOVERDE_SALES),
    icon: TrendingUp,
    color: '#3B82F6'
  },
  {
    label: 'CV Market Share',
    value: calculatePercentage(CAMPOVERDE_SALES, TOTAL_US_SALES),
    icon: PieChart,
    color: '#F59E0B'
  },
  {
    label: 'Total Target',
    value: '$11M',
    icon: Target,
    color: '#EC4899'
  }
];