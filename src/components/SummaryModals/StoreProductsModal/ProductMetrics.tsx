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
            <TrendingUp className="w-3 h-3 text-[#00FF9C]" />
            <span className="text-xs text-dark-400">Sales growth</span>
          </div>
          <span className="text-xs font-medium">{metrics.salesGrowth}</span>
        </div>
      </div>

      <div className="p-3 bg-dark-800/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-dark-400">Sales mix</span>
          </div>
          <span className="text-xs font-medium">{salesMix}%*</span>
        </div>
      </div>

      <div className="p-3 bg-dark-800/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-3 h-3 text-purple-400" />
            <span className="text-xs text-dark-400">$ASW</span>
          </div>
          <span className="text-xs font-medium">{metrics.asw}</span>
        </div>
      </div>

      <div className="p-3 bg-dark-800/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-3 h-3 text-orange-400" />
            <span className="text-xs text-dark-400">$ASW past year</span>
          </div>
          <span className="text-xs font-medium">{metrics.aswPastYear}</span>
        </div>
      </div>

      <div className="col-span-2 p-3 bg-dark-800/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-dark-400">$ASW growth</span>
          </div>
          <span className="text-xs font-medium">{metrics.aswGrowth}</span>
        </div>
      </div>
    </div>
  );
};