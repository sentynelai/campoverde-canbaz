import React from 'react';
import { DollarSign, Package2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatLargeCurrency } from '../../../utils/sales';
import { calculateTotalUnitsGrowth, calculateTotalSalesGrowth } from '../../../utils/growth';

interface SalesSectionProps {
  currentSales: number;
  targetSales: number;
  stores: any[];
}

export const SalesSection: React.FC<SalesSectionProps> = ({
  currentSales,
  targetSales,
  stores
}) => {
  const salesProgress = (currentSales / targetSales) * 100;
  const { currentUnits, growthPercentage: unitsGrowth } = calculateTotalUnitsGrowth(stores);
  const { growthPercentage: salesGrowth } = calculateTotalSalesGrowth(stores);

  // Format units in millions
  const formattedUnits = `${(currentUnits / 1000000).toFixed(1)}M`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <DollarSign className="w-4 h-4 text-[#00FF9C]" />
              </div>
              <span className="text-dark-200">Total CV sales</span>
            </div>
            <div className="text-right">
              <span className="font-medium block">{formatLargeCurrency(currentSales)}</span>
              <span className={`text-xs ${salesGrowth >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}`}>
                {salesGrowth >= 0 ? '+' : ''}{salesGrowth.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#3B82F6]/20">
                <Package2 className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <span className="text-dark-200">Total units sales</span>
            </div>
            <div className="text-right">
              <span className="font-medium block">{formattedUnits}</span>
              <span className={`text-xs ${unitsGrowth >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}`}>
                {unitsGrowth >= 0 ? '+' : ''}{unitsGrowth.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-dark-400">Sales progress</span>
          <span className="text-[#00FF9C]">{salesProgress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${salesProgress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-[#00FF9C] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};