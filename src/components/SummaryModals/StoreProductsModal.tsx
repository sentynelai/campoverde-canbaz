import React, { useMemo } from 'react';
import { Package, X, Leaf, Zap, Coffee, Heart, Apple, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';

const PRODUCT_COLUMNS = [
  {
    id: 'CV ENERGY BOOST Sales',
    name: 'CV ENERGY BOOST',
    icon: Zap,
    color: '#00FF9C'
  },
  {
    id: 'CV EXOTIC INDULGENCE Sales',
    name: 'CV EXOTIC INDULGENCE',
    icon: Apple,
    color: '#F59E0B'
  },
  {
    id: 'CV ACAI ENERGIZE PWR Sales',
    name: 'CV ACAI ENERGIZE PWR',
    icon: Coffee,
    color: '#3B82F6'
  },
  {
    id: 'CV PASSION BLISS Sales',
    name: 'CV PASSION BLISS',
    icon: Heart,
    color: '#EC4899'
  },
  {
    id: 'CV FIT & WELLNESS Sales',
    name: 'CV FIT & WELLNESS',
    icon: Dumbbell,
    color: '#8B5CF6'
  },
  {
    id: 'CV CHIA SUPREMACY Sales',
    name: 'CV CHIA SUPREMACY',
    icon: Leaf,
    color: '#10B981'
  }
];

export const StoreProductsModal: React.FC = () => {
  const { allStores } = useStoreData();
  const { setIsVisible } = useSummaryModals();

  const { sortedProducts, totalSales } = useMemo(() => {
    // Calculate total sales for each product
    const productSales = PRODUCT_COLUMNS.map(product => {
      const sales = allStores.reduce((sum, store) => sum + (store[product.id] || 0), 0);
      return { ...product, sales };
    });

    // Sort products by sales in descending order
    const sorted = productSales.sort((a, b) => b.sales - a.sales);

    // Calculate total sales across all products
    const total = sorted.reduce((sum, product) => sum + product.sales, 0);

    return { sortedProducts: sorted, totalSales: total };
  }, [allStores]);

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

      <div className="space-y-6">
        {sortedProducts.map((product, index) => (
          <div key={product.id} className="space-y-4">
            <div className="p-4 bg-dark-800/30 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${product.color}20` }}>
                    <product.icon className="w-4 h-4" style={{ color: product.color }} />
                  </div>
                  <span className="text-dark-200">{product.name}</span>
                </div>
                <span className="font-medium">${(product.sales / 1000).toFixed(2)}k</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-dark-400">Progress</span>
                  <span className="text-[#00FF9C]">80%</span>
                </div>
                <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#00FF9C] rounded-full"
                  />
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-400">$ASW</span>
                  <span>{(product.sales / 3010 / 52).toFixed(2).replace(/\.?0+$/, '')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};