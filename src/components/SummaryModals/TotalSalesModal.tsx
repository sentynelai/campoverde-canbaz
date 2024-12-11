import React from 'react';
import { DollarSign, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';
import { getSalesMetrics } from '../../lib/config/salesMetrics';

export const TotalSalesModal: React.FC = () => {
  const { allStores } = useStoreData();
  const { setIsVisible } = useSummaryModals();
  const metrics = getSalesMetrics();

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

      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-dark-800/30 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                    <Icon className="w-4 h-4" style={{ color: metric.color }} />
                  </div>
                  <span className="text-dark-200">{metric.label}</span>
                </div>
                <span className="font-medium">{metric.value}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};