import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, BarChart } from 'lucide-react';
import { useStoreSelection } from '../../hooks/useStoreSelection';
import { useBusinessMetrics } from './hooks/useBusinessMetrics';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { MainMetrics } from './components/MainMetrics';
import { formatCurrency } from '../../utils/formatters';

export const BusinessPerformance: React.FC = () => {
  const { selectedStore } = useStoreSelection();
  const { totalRevenue, totalTarget } = useBusinessMetrics(selectedStore);

  if (!selectedStore) return null;

  const metrics = [
    {
      label: 'Total Sales',
      value: formatCurrency(selectedStore.sales),
      icon: DollarSign,
      color: '[#00FF9C]'
    },
    {
      label: 'Velocity',
      value: `${Math.round(selectedStore.velocity_ly || 0).toLocaleString()}%`,
      icon: TrendingUp,
      color: 'blue-400'
    }
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`business-performance-${selectedStore.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-2"
      >
        <div className="flex items-center gap-2 mb-4 sticky top-0 bg-dark-950/90 py-2">
          <BarChart className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">Business Performance</h2>
        </div>

        <MainMetrics metrics={metrics} />
        <PerformanceMetrics store={selectedStore} />
      </motion.div>
    </AnimatePresence>
  );
};