import React from 'react';
import { DollarSign, X, Target, TrendingUp, Package2, Store, ArrowUpDown, Percent, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';
import { calculateQuantityMetrics } from '../../lib/metrics/quantityMetrics';

export const TotalSalesModal: React.FC = () => {
  const { setIsVisible } = useSummaryModals();
  const { allStores } = useStoreData();
  const { totalQtyTY, totalQtyLY, variation } = calculateQuantityMetrics(allStores);

  const currentSales = 12300000; // $12.3M
  const targetSales = 11000000; // $11M
  const previousSales = 10400000; // $10.4M
  const salesProgress = (currentSales / targetSales) * 100;
  const salesGrowth = ((currentSales - previousSales) / previousSales) * 100;

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

      {/* Sales Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-dark-800/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                  <DollarSign className="w-4 h-4 text-[#00FF9C]" />
                </div>
                <span className="text-dark-200">Total CV sales</span>
              </div>
              <span className="font-medium">$12.3M</span>
            </div>
          </div>

          <div className="p-4 bg-dark-800/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#EC4899]/20">
                  <Target className="w-4 h-4 text-[#EC4899]" />
                </div>
                <span className="text-dark-200">Sales goal</span>
              </div>
              <span className="font-medium">$11M</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">Sales progress</span>
            <span className="text-[#00FF9C]">{salesProgress.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${salesProgress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-[#00FF9C] rounded-full"
            />
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <TrendingUp className="w-4 h-4 text-[#00FF9C]" />
              </div>
              <span className="text-dark-200">Sales growth</span>
            </div>
            <span className={`font-medium ${salesGrowth >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}`}>
              {salesGrowth >= 0 ? '+' : ''}{salesGrowth.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      {/* Distribution Section */}
      <div className="space-y-4 mt-6 pt-4 border-t border-dark-800/50">
        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#8B5CF6]/20">
                <Store className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="text-dark-200">Total CV Current stores</span>
            </div>
            <span className="font-medium">3,010</span>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#F59E0B]/20">
                <ArrowUpDown className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <span className="text-dark-200">Unweighted Distribution</span>
            </div>
            <span className="font-medium">0.65</span>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#10B981]/20">
                <Percent className="w-4 h-4 text-[#10B981]" />
              </div>
              <span className="text-dark-200">Unweighted Distribution Growth</span>
            </div>
            <span className="text-dark-400">N/A</span>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="space-y-4 mt-6 pt-4 border-t border-dark-800/50">
        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                <Gauge className="w-4 h-4 text-[#00FF9C]" />
              </div>
              <span className="text-dark-200">Velocity</span>
            </div>
            <span className="font-medium">4,076.99%</span>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#3B82F6]/20">
                <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <span className="text-dark-200">U ASW</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span className="font-medium">7.15</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-dark-800/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#EC4899]/20">
                <DollarSign className="w-4 h-4 text-[#EC4899]" />
              </div>
              <span className="text-dark-200">$ASW</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span className="font-medium">78.40</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};