import React from 'react';
import { Package2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateQuantityMetrics } from '../../../lib/metrics/quantityMetrics';
import { useStoreData } from '../../../hooks/useStoreData';

export const UnitsMetrics: React.FC = () => {
  const { allStores } = useStoreData();
  const { totalQtyTY, totalQtyLY, variation } = calculateQuantityMetrics(allStores);

  return (
    <div className="space-y-4 mt-6 pt-4 border-t border-dark-800/50">
      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#3B82F6]/20">
              <Package2 className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <span className="text-dark-200">Total CV units</span>
          </div>
          <span className="font-medium">{totalQtyLY.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#00FF9C]/20">
              <TrendingUp className="w-4 h-4 text-[#00FF9C]" />
            </div>
            <span className="text-dark-200">Units growth</span>
          </div>
          <span className={`font-medium ${variation >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}`}>
            {variation >= 0 ? '+' : ''}{variation.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};