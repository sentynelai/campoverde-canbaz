import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, AlertCircle } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';

interface ProductData {
  name: string;
  salesColumn: string;
  target: number;
}

const PRODUCTS: ProductData[] = [
  {
    name: 'CV ENERGY BOOST',
    salesColumn: 'CV ENERGY BOOST Sales',
    target: 0
  },
  {
    name: 'CV EXOTIC INDULGENCE',
    salesColumn: 'CV EXOTIC INDULGENCE Sales',
    target: 0
  },
  {
    name: 'CV ACAI ENERGIZE PWR',
    salesColumn: 'CV ACAI ENERGIZE PWR Sales',
    target: 0
  },
  {
    name: 'CV PASSION BLISS',
    salesColumn: 'CV PASSION BLISS Sales',
    target: 0
  },
  {
    name: 'CV FIT & WELLNESS',
    salesColumn: 'CV FIT & WELLNESS Sales',
    target: 0
  },
  {
    name: 'CV CHIA SUPREMACY',
    salesColumn: 'CV CHIA SUPREMACY Sales',
    target: 0
  }
];

export const ProductPerformance: React.FC = () => {
  const { selectedStore } = useStoreSelection();

  const { totalRevenue, totalTarget } = useMemo(() => {
    if (!selectedStore) return { totalRevenue: 0, totalTarget: 0 };

    const revenue = PRODUCTS.reduce((acc, product) => {
      return acc + (selectedStore[product.salesColumn] || 0);
    }, 0);

    const target = PRODUCTS.reduce((acc, product) => acc + product.target, 0);

    return { totalRevenue: revenue, totalTarget: target };
  }, [selectedStore]);

  if (!selectedStore) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`product-performance-${selectedStore.storeNumber}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-2"
      >
        <div className="flex items-center gap-2 mb-4 sticky top-0 bg-dark-950/90 py-2">
          <DollarSign className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">Store Products</h2>
        </div>

        <div className="space-y-4">
          {PRODUCTS.sort((a, b) => selectedStore[a.salesColumn] > selectedStore[b.salesColumn] ? -1 : 1).map((product, index) => {
            const sales = selectedStore[product.salesColumn] || 0;
            const progress = (sales / product.target) * 100;
            const isOnTarget = progress >= 85;
            
            return sales && (
              <motion.div
                key={product.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-dark-200 flex-1 mr-2">{product.name}</span>
                  <span className={`${isOnTarget ? 'text-[#00FF9C]' : 'text-orange-400'} font-medium`}>
                    ${sales}M
                  </span>
                </div>
                
                <div className="relative h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute h-full ${isOnTarget ? 'bg-[#00FF9C]' : 'bg-orange-400'} rounded-full`}
                    style={{
                      boxShadow: isOnTarget 
                        ? '0 0 10px rgba(0, 255, 156, 0.3)' 
                        : '0 0 10px rgba(251, 146, 60, 0.3)'
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-dark-400">
                    Progress: <span className={isOnTarget ? 'text-[#00FF9C]' : 'text-orange-400'}>
                      0%
                    </span>
                  </span>
                  <span className="text-dark-400">
                    Target: No Data
                  </span>
                </div>

                <div
                  className="mt-4 p-4 bg-dark-800/30 rounded-lg"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-400">Penetration</span>
                      <span>$0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-400">Units sold</span>
                      <span>0</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-400">Revenue</span>
                      <span>${sales}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-400">Weighted sales</span>
                      <span>0%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-dark-800/50 sticky bottom-0 bg-dark-950/90 py-2 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Total Revenue</span>
              <span className="text-[#00FF9C] font-medium">
                ${totalRevenue}M
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Target Revenue</span>
              <span className="text-dark-200 font-medium">
                ${(totalTarget / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};