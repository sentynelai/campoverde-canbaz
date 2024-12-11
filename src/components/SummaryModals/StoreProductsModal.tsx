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

  const { productTotals, totalSales } = useMemo(() => {
    const totals = PRODUCT_COLUMNS.reduce((acc, { id }) => {
      const total = allStores.reduce((sum, store) => sum + (store[id] || 0), 0);
      return {
        ...acc,
        [id]: total
      };
    }, {} as Record<string, number>);

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);

    return {
      productTotals: totals,
      totalSales: total
    };
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
        {PRODUCT_COLUMNS.map((product, index) => {
          const Icon = product.icon;
          const value = productTotals[product.id];
          const salesMix = ((value / totalSales) * 100).toFixed(2);

          return (
            <div key={product.id} className="space-y-4">
              {/* Main Product Info */}
              <div className="p-4 bg-dark-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${product.color}20` }}>
                      <Icon className="w-4 h-4" style={{ color: product.color }} />
                    </div>
                    <span className="text-dark-200">{product.name}</span>
                  </div>
                  <span className="font-medium">${(value / 1000000).toFixed(2)}M</span>
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
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-dark-800/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-400">Sales growth</span>
                    <span className="text-xs font-medium">+15.3%*</span>
                  </div>
                </div>

                <div className="p-3 bg-dark-800/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-400">Sales mix</span>
                    <span className="text-xs font-medium">{salesMix}%*</span>
                  </div>
                </div>

                <div className="p-3 bg-dark-800/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-400">$ASW</span>
                    <span className="text-xs font-medium">52.80*</span>
                  </div>
                </div>

                <div className="p-3 bg-dark-800/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-400">$ASW past year</span>
                    <span className="text-xs font-medium">48.65*</span>
                  </div>
                </div>

                <div className="col-span-2 p-3 bg-dark-800/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-400">$ASW growth</span>
                    <span className="text-xs font-medium">+8.5%*</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};