import React from 'react';
import { DollarSign, TrendingUp, PieChart, History } from 'lucide-react';

interface ProductMetricsProps {
  salesMix: string;
}

export const ProductMetrics: React.FC<ProductMetricsProps> = ({ salesMix }) => {
  // Simulated metrics with asterisk
  const metrics = {
    salesGrowth: '+15.3%*',
    asw: '52.80*',
    aswPastYear: '48.65*',
    aswGrowth: '+8.5%*'
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-dark-800/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-dark-400">$ASW</span>
          </div>
          <span className="text-xs font-medium">{metrics.asw}</span>
        </div>
      </div>
    </div>
  );
};