import React, { useMemo } from 'react';
import { Package, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../../hooks/useStoreData';
import { useSummaryModals } from '../../../contexts/SummaryModalsContext';
import { ProductRow } from './ProductRow';
import { PRODUCT_COLUMNS } from './constants';

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
          <ProductRow
            key={product.id}
            id={product.id}
            name={product.name}
            icon={product.icon}
            color={product.color}
            value={product.sales}
            totalSales={totalSales}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};