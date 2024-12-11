import React from 'react';

interface ProductMetricsProps {
  salesMix: string;
}

export const ProductMetrics: React.FC<ProductMetricsProps> = ({ salesMix }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 bg-dark-800/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-dark-400">$ASW</span>
          </div>
          <span className="text-xs font-medium">52.80*</span>
        </div>
      </div>
    </div>
  );
};