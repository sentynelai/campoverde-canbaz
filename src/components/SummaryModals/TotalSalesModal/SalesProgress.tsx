import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Target } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface SalesProgressProps {
  currentSales: number;
  targetSales: number;
}

export const SalesProgress: React.FC<SalesProgressProps> = ({ currentSales, targetSales }) => {
  const progress = (currentSales / targetSales) * 100;
  const previousSales = 10400000; // $10.4M
  const growthPercentage = ((currentSales - previousSales) / previousSales) * 100;

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
            <span className="font-medium">{formatCurrency(currentSales)}</span>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#EC4899]/20">
                <Target className="w-4 h-4 text-[#EC4899]" />
              </div>
              <span className="text-dark-200">Sales goal</span>
            </div>
            <span className="font-medium">{formatCurrency(targetSales)}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-dark-400">Sales progress</span>
          <span className="text-[#00FF9C]">{progress.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-[#00FF9C] rounded-full"
          />
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-dark-400">Sales growth</span>
          <span className={`text-sm font-medium ${growthPercentage >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}`}>
            {growthPercentage >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};