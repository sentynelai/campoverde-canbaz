import React from 'react';
import { DollarSign, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSummaryModals } from '../../../contexts/SummaryModalsContext';
import { SalesProgress } from './SalesProgress';
import { UnitsMetrics } from './UnitsMetrics';
import { DistributionMetrics } from './DistributionMetrics';
import { PerformanceMetrics } from './PerformanceMetrics';
import { TiersMetrics } from './TiersMetrics';

export const TotalSalesModal: React.FC = () => {
  const { setIsVisible } = useSummaryModals();
  const currentSales = 12300000; // $12.3M
  const targetSales = 11000000; // $11M

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-2"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">Total Sales</h2>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1.5 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <SalesProgress currentSales={currentSales} targetSales={targetSales} />
      <UnitsMetrics />
      <DistributionMetrics />
      <PerformanceMetrics />
      <TiersMetrics />
    </motion.div>
  );
};