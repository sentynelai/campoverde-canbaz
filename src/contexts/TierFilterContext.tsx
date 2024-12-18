import React, { createContext, useContext, useState } from 'react';
import type { TierType } from '../types';

interface TierFilterContextType {
  activeTiers: Set<TierType>;
  toggleTier: (tier: TierType) => void;
  isActive: (tier: TierType) => boolean;
}

const TierFilterContext = createContext<TierFilterContextType>({
  activeTiers: new Set(),
  toggleTier: () => {},
  isActive: () => false,
});

export const TierFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTiers, setActiveTiers] = useState<Set<TierType>>(
    new Set(['Diamond', 'Emerald', 'Amethyst', 'Quartz', 'Topaz'])
  );

  const toggleTier = (tier: TierType) => {
    setActiveTiers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tier)) {
        newSet.delete(tier);
      } else {
        newSet.add(tier);
      }
      return newSet;
    });
  };

  const isActive = (tier: TierType) => activeTiers.has(tier);

  return (
    <TierFilterContext.Provider value={{ activeTiers, toggleTier, isActive }}>
      {children}
    </TierFilterContext.Provider>
  );
};

export const useTierFilter = () => useContext(TierFilterContext);