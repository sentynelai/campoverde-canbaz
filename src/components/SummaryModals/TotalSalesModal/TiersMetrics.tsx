import React from 'react';
import { Diamond } from 'lucide-react';
import { useStoreData } from '../../../hooks/useStoreData';
import { TIER_COLORS } from '../../../constants/tiers';

export const TiersMetrics: React.FC = () => {
  const { allStores } = useStoreData();

  // Calculate tier counts
  const tierCounts = allStores.reduce((acc, store) => {
    const tier = store.tier || 'Unknown';
    acc[tier] = (acc[tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4 mt-6 pt-4 border-t border-dark-800/50">
      <div className="text-sm text-dark-400 mb-2">Store Tiers</div>
      {Object.entries(TIER_COLORS)
        .filter(([tier]) => tier !== 'Unknown')
        .sort(([tierA], [tierB]) => tierA.localeCompare(tierB))
        .map(([tier, color]) => (
          <div key={tier} className="p-4 bg-dark-800/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="p-2 rounded-lg" 
                  style={{ backgroundColor: `${color}20` }}
                >
                  <Diamond 
                    className="w-4 h-4" 
                    style={{ color }} 
                  />
                </div>
                <span className="text-dark-200">{tier}</span>
              </div>
              <span className="font-medium">{(tierCounts[tier] || 0).toLocaleString()}</span>
            </div>
          </div>
        ))}
    </div>
  );
};