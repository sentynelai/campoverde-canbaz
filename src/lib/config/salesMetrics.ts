import { DollarSign, TrendingUp, PieChart, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SalesMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export const getSalesMetrics = (): SalesMetric[] => [
  {
    label: 'Total US Sales',
    value: '$441.8B',
    icon: DollarSign,
    color: '#00FF9C'
  },
  {
    label: 'Campoverde Sales',
    value: '$10.4M',
    icon: TrendingUp,
    color: '#3B82F6'
  },
  {
    label: '% Campoverde Sales',
    value: '$0.00%',
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