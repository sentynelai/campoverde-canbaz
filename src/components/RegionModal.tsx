import React from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Package, Store, TrendingUp } from 'lucide-react';

interface RegionStats {
  name: string;
  totalSales: number;
  totalSKUs: number;
  totalStores: number;
  pySales: number;
}

interface RegionModalProps {
  stats: RegionStats;
  onClose: () => void;
}

export const RegionModal: React.FC<RegionModalProps> = ({ stats, onClose }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{stats.name} Region</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              label: 'Total Sales',
              value: `$${(stats.totalSales).toLocaleString()}`,
              icon: DollarSign,
              color: '[#00FF9C]'
            },
            {
              label: 'Total SKUs',
              value: stats.totalSKUs.toLocaleString(),
              icon: Package,
              color: 'blue-400'
            },
            {
              label: 'Total Stores',
              value: stats.totalStores.toLocaleString(),
              icon: Store,
              color: 'purple-400'
            },
            {
              label: 'PY Sales',
              value: `$${(stats.pySales).toLocaleString()}`,
              icon: TrendingUp,
              color: 'orange-400'
            }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${item.color}/20`}>
                  <item.icon className={`w-5 h-5 text-${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-dark-400">{item.label}</p>
                  <p className="text-lg font-semibold">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-dark-800/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-dark-400">YoY Growth</span>
            <span className="text-[#00FF9C] font-medium">
              {(((stats.totalSales - stats.pySales) / stats.pySales) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((stats.totalSales / stats.pySales) * 100) - 100}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-[#00FF9C] rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};