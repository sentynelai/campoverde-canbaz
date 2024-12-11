import React from 'react';
import { DollarSign, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';

export const TotalSalesModal: React.FC = () => {
  const { allStores } = useStoreData(); // Use allStores instead of stores
  const { setIsVisible } = useSummaryModals();

  const totalSales = allStores.reduce((sum, store) => sum + (store.total_sales || 0), 0);
  const totalCampoverdeSales = allStores.reduce((sum, store) => sum + (store.campoverde_sales || 0), 0);
  const percentageCampoverde = (totalCampoverdeSales / totalSales) * 100;

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
        {[
          {
            label: 'Total US Sales',
            value: `$441.8B`
          },
          {
            label: 'Campoverde Sales',
            value: `$10.4M`
          },
          {
            label: '% Campoverde Sales',
            value: `${(((10351572.57 / 1000000000).toFixed(1)*100)/441.8).toFixed(2)}%`
          }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-dark-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-dark-200">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};