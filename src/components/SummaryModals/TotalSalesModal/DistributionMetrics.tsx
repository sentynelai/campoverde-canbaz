import React from 'react';
import { Store, ArrowUpDown, Percent } from 'lucide-react';

export const DistributionMetrics: React.FC = () => {
  return (
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
  );
};