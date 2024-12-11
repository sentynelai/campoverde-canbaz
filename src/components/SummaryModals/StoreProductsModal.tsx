import React from 'react';
import { Package, X, Leaf, Zap, Coffee, Heart, Apple, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';

const PRODUCT_COLUMNS = [
  {
    id: 'CV ENERGY BOOST Sales',
    icon: Zap,
    color: '#00FF9C'
  },
  {
    id: 'CV EXOTIC INDULGENCE Sales',
    icon: Apple,
    color: '#F59E0B'
  },
  {
    id: 'CV ACAI ENERGIZE PWR Sales',
    icon: Coffee,
    color: '#3B82F6'
  },
  {
    id: 'CV PASSION BLISS Sales',
    icon: Heart,
    color: '#EC4899'
  },
  {
    id: 'CV FIT & WELLNESS Sales',
    icon: Dumbbell,
    color: '#8B5CF6'
  },
  {
    id: 'CV CHIA SUPREMACY Sales',
    icon: Leaf,
    color: '#10B981'
  }
];

export const StoreProductsModal: React.FC = () => {
  const { allStores } = useStoreData();
  const { setIsVisible } = useSummaryModals();

  const productTotals = PRODUCT_COLUMNS.reduce((acc, { id }) => {
    const total = allStores.reduce((sum, store) => sum + (store[id] || 0), 0);
    return {
      ...acc,
      [id]: total
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
        {PRODUCT_COLUMNS.map(({ id, icon: Icon, color }, index) => (
          <motion.div
            key={id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-dark-800/30 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-dark-200">{id.replace(' Sales', '')}</span>
              </div>
              <span className="font-medium">
                ${(productTotals[id]).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};