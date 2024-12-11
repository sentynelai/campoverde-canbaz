import React from 'react';
import { Gauge, DollarSign, TrendingUp, History } from 'lucide-react';

export const PerformanceMetrics: React.FC = () => {
  return (
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
          <span className="font-medium">7.15</span>
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
          <span className="font-medium">78.40</span>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#F59E0B]/20">
              <History className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <span className="text-dark-200">$ASW Past Year</span>
          </div>
          <span className="text-dark-400">N/A</span>
        </div>
      </div>

      <div className="p-4 bg-dark-800/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#10B981]/20">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
            </div>
            <span className="text-dark-200">$ASW Growth</span>
          </div>
          <span className="text-dark-400">N/A</span>
        </div>
      </div>
    </div>
  );
};