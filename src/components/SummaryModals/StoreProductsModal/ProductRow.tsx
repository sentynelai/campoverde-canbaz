import React from 'react';
import { motion } from 'framer-motion';
import { ProductProgress } from './ProductProgress';
import { ProductMetrics } from './ProductMetrics';

interface ProductRowProps {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  value: number;
  index: number;
  totalSales: number;
}

export const ProductRow: React.FC<ProductRowProps> = ({ 
  id, 
  name, 
  icon: Icon, 
  color, 
  value, 
  index,
  totalSales 
}) => {
  // Calculate sales mix percentage
  const salesMix = ((value / totalSales) * 100).toFixed(2);

  return (
    <motion.div
      key={id}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-4"
    >
      {/* Main Product Info */}
      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <span className="text-dark-200">{name}</span>
          </div>
          <span className="font-medium">${(value / 1000).toFixed(2)}K</span>
        </div>

        <ProductProgress />
      </div>

      <ProductMetrics salesMix={salesMix} />
    </motion.div>
  );
};