import React from 'react';
import { Gauge, DollarSign, TrendingUp } from 'lucide-react';
import type { StoreData } from '../../../types';
import { calculateVelocity } from '../../../utils/metrics';
import { formatCurrency } from '../../../utils/formatters';

interface PerformanceSectionProps {
  stores: StoreData[];
}

export const PerformanceSection: React.FC<PerformanceSectionProps> = ({ stores }) => {
  const velocity = calculateVelocity(stores);
  const totalStores = stores.length;
  const activeStores = stores.filter(store => store.sales_52w > 0).length;
  const averageSalesPerStore = totalStores > 0 ? stores.reduce((sum, store) => sum + (store.sales_52w || 0), 0) / activeStores / 52 : 0;

  return (
    <div className="space-y-4 mt-6 pt-4 border-t border-dark-800/50">
      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <Gauge className="w-4 h-4 text-[#00FF9C]" />
            </div>
            <span className="text-dark-200">Velocity</span>
          </div>
          <span className="font-medium">${velocity.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#3B82F6]/20">
              <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <span className="text-dark-200">U ASW</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            <span className="font-medium">{averageSalesPerStore.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#EC4899]/20">
              <DollarSign className="w-4 h-4 text-[#EC4899]" />
            </div>
            <span className="text-dark-200">$ASW</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            <span className="font-medium">{formatCurrency(averageSalesPerStore)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};