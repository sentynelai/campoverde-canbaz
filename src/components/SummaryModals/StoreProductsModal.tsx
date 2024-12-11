import React from 'react';
import { Package, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';

const PRODUCT_COLUMNS = [
  'CV ENERGY BOOST Sales',
  'CV EXOTIC INDULGENCE Sales',
  'CV ACAI ENERGIZE PWR Sales',
  'CV PASSION BLISS Sales',
  'CV FIT & WELLNESS Sales',
  'CV CHIA SUPREMACY Sales'
];

export const StoreProductsModal: React.FC = () => {
  const { allStores } = useStoreData(); // Use allStores instead of stores
  const { setIsVisible } = useSummaryModals();

  const productTotals = PRODUCT_COLUMNS.reduce((acc, column) => {
    const total = allStores.reduce((sum, store) => sum + (store[column] || 0), 0);
    return {
      ...acc,
      [column]: total
    };
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-2"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">Store Products</h2>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1.5 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {PRODUCT_COLUMNS.map((product, index) => (
          <motion.div
            key={product}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-dark-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-dark-200">{product.replace(' Sales', '')}</span>
              <span className="font-medium">
                ${(productTotals[product]).toFixed(1)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};