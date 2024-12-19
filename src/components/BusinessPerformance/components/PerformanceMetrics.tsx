import React from 'react';
import { motion } from 'framer-motion';
import type { StoreData } from '../../../types';
import { calculateTotalProductSales } from '../../../utils/salesCalculations';
import { formatCurrency } from '../../../utils/formatters';

interface PerformanceMetricsProps {
  store: StoreData;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ store }) => {
  const totalRevenue = calculateTotalProductSales(store);
  const unitsSold = store.total_sales || 0;

  const metrics = [
    { label: 'Penetration', value: '$0' },
    { label: 'Units sold', value: unitsSold.toLocaleString() },
    { label: 'Revenue', value: formatCurrency(totalRevenue) },
    { label: 'Weighted sales', value: '$0' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-dark-800/30 rounded-lg"
    >
      <div className="space-y-2">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex justify-between text-sm">
            <span className="text-dark-400">{metric.label}</span>
            <span>{metric.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};