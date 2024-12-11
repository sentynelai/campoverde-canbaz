import React from 'react';
import { Package2, History, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { calculateQuantityMetrics } from '../../lib/metrics/quantityMetrics';

export const ProductQuantityMetrics: React.FC = () => {
  const { allStores } = useStoreData();
  const { totalQtyTY, totalQtyLY, variation } = calculateQuantityMetrics(allStores);

  const metrics = [
    {
      label: 'Total Qty',
      value: totalQtyTY.toLocaleString(),
      icon: Package2,
      color: '#00FF9C'
    },
    {
      label: 'Total Qty (last year)',
      value: totalQtyLY.toLocaleString(),
      icon: History,
      color: '#3B82F6'
    },
    {
      label: 'Var',
      value: `${variation.toFixed(1)}%`,
      icon: TrendingUp,
      color: variation >= 0 ? '#10B981' : '#EF4444'
    }
  ];

  return (
    <div className="mt-6 pt-4 border-t border-dark-800/50">
      <h3 className="text-sm font-medium text-dark-400 mb-4">Quantity Metrics</h3>
      <div className="space-y-3">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-dark-800/20 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                  <span className="text-sm text-dark-200">{metric.label}</span>
                </div>
                <span className="text-sm font-medium" style={{ color: metric.color }}>
                  {metric.value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};