import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, TrendingUp, BarChart } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { calculateTotalProductSales } from '../utils/salesCalculations';

export const BusinessPerformance: React.FC = () => {
  const { selectedStore } = useStoreSelection();

  const { totalRevenue, totalTarget } = useMemo(() => {
    if (!selectedStore) return { totalRevenue: 0, totalTarget: 0 };

    const revenue = calculateTotalProductSales(selectedStore);
    const target = 0; // Default target

    return { totalRevenue: revenue, totalTarget: target };
  }, [selectedStore]);

  if (!selectedStore) return null;

  const metrics = [
    {
      label: 'Total Sales',
      value: `$${(selectedStore.sales / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: '[#00FF9C]'
    },
    {
      label: 'Velocity',
      value: `${selectedStore.velocity_ly || 0}%`,
      icon: TrendingUp,
      color: 'blue-400'
    }
  ];

  const performanceMetrics = [
    { label: 'Penetration', value: '$0' },
    { label: 'Units sold', value: selectedStore.total_sales?.toLocaleString() || '0' },
    { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}` },
    { label: 'Weighted sales', value: '$0' }
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

        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-dark-800/30 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}/20`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-dark-400">{metric.label}</p>
                    <p className="text-lg font-semibold">{metric.value}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* New Performance Metrics Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-dark-800/30 rounded-lg"
          >
            <div className="space-y-2">
              {performanceMetrics.map((metric) => (
                <div key={metric.label} className="flex justify-between text-sm">
                  <span className="text-dark-400">{metric.label}</span>
                  <span>{metric.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};