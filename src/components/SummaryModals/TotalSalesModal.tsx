import React from 'react';
import { DollarSign, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';
import { calculateQuantityMetrics } from '../../lib/metrics/quantityMetrics';
import { TiersMetrics } from './TotalSalesModal/TiersMetrics';
import { calculateTotalSales, formatLargeCurrency } from '../../utils/sales';
import { SalesSection } from './TotalSalesModal/SalesSection';
import { DistributionSection } from './TotalSalesModal/DistributionSection';
import { PerformanceSection } from './TotalSalesModal/PerformanceSection';

export const TotalSalesModal: React.FC = () => {
  const { setIsVisible } = useSummaryModals();
  const { allStores } = useStoreData();
  const { totalQtyTY, totalQtyLY, variation } = calculateQuantityMetrics(allStores);

  const currentSales = calculateTotalSales(allStores);
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

      <SalesSection 
        currentSales={currentSales}
        targetSales={targetSales}
        stores={allStores}
      />
      <DistributionSection stores={allStores} />
      <PerformanceSection stores={allStores} />
      <TiersMetrics />
    </motion.div>
  );
};