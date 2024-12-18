import React from 'react';
import { Diamond } from 'lucide-react';
import { TIER_COLORS } from '../constants/tiers';
import { useTierFilter } from '../contexts/TierFilterContext';
import type { TierType } from '../types';

export const MapLegend: React.FC = () => {
  const { toggleTier, isActive } = useTierFilter();

  return (
    <div className="fixed bottom-24 left-4 bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 z-10">
      <h3 className="text-sm font-medium text-dark-400 mb-3">Store Tiers</h3>
      <div className="space-y-2">
        {Object.entries(TIER_COLORS)
          .filter(([tier]) => tier !== 'Unknown')
          .map(([tier, color]) => (
            <button
              key={tier}
              onClick={() => toggleTier(tier as TierType)}
              className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ${
                isActive(tier as TierType)
                  ? 'bg-dark-800/30'
                  : 'bg-transparent hover:bg-dark-800/20'
              }`}
            >
              <div 
                className="p-2 rounded-lg" 
                style={{ backgroundColor: `${color}20` }}
              >
                <Diamond 
                  className="w-4 h-4" 
                  style={{ color: isActive(tier as TierType) ? color : '#404040' }} 
                />
              </div>
              <span className={`text-sm ${
                isActive(tier as TierType) ? 'text-white' : 'text-dark-400'
              }`}>
                {tier}
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};