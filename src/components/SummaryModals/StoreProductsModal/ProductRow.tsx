import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ProductRowProps {
  id: string;
  name: string;
  icon: LucideIcon;
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
  const salesMix = ((value / totalSales) * 100).toFixed(2);
  const salesGrowth = '+15.3%*';
  const aswValue = '52.80*';
  const aswPastYear = '48.65*';
  const aswGrowth = '+8.5%*';

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-4"
    >
      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <span className="text-dark-200">{name}</span>
          </div>
          <span className="font-medium">${(value / 1000).toFixed(2)}k</span>
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
            <span className="text-dark-400">Sales growth</span>
            <span className="text-[#00FF9C]">{salesGrowth}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">Sales mix</span>
            <span>{salesMix}%*</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">$ASW</span>
            <span>{aswValue}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">$ASW past year</span>
            <span>{aswPastYear}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">$ASW growth</span>
            <span>{aswGrowth}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};