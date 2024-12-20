import React, { createContext, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingOverlay } from '../components/LoadingOverlay';
import type { TierType } from '../types';
import { TIER_COLORS } from '../constants/tiers';

interface TierFilterContextType {
  activeTiers: Set<TierType>;
  toggleTier: (tier: TierType) => void;
  isActive: (tier: TierType) => boolean;
  setAllTiers: (active: boolean) => void;
}

const TierFilterContext = createContext<TierFilterContextType>({
  activeTiers: new Set(),
  toggleTier: () => {},
  isActive: () => false,
  setAllTiers: () => {}
});

// Increased loading time to 1.5 seconds
const LOADING_DELAY = 1500;

export const TierFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with only Diamond tier active
  const [activeTiers, setActiveTiers] = useState<Set<TierType>>(
    new Set(['Diamond'])
  );
  const [isLoading, setIsLoading] = useState(false);

  const toggleTier = async (tier: TierType) => {
    setIsLoading(true);
    
    // Increased artificial delay
    await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
    
    setActiveTiers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tier)) {
        newSet.delete(tier);
      } else {
        newSet.add(tier);
      }
      return newSet;
    });
    
    setIsLoading(false);
  };

  const isActive = (tier: TierType) => activeTiers.has(tier);

  const setAllTiers = async (active: boolean) => {
    setIsLoading(true);
    
    // Increased artificial delay
    await new Promise(resolve => setTimeout(resolve, LOADING_DELAY));
    
    if (active) {
      // Add all tiers except 'Unknown'
      const allTiers = Object.keys(TIER_COLORS).filter(tier => tier !== 'Unknown');
      setActiveTiers(new Set(allTiers));
    } else {
      setActiveTiers(new Set());
    }
    
    setIsLoading(false);
  };

  return (
    <TierFilterContext.Provider value={{ activeTiers, toggleTier, isActive, setAllTiers }}>
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
      {children}
    </TierFilterContext.Provider>
  );
};

export const useTierFilter = () => useContext(TierFilterContext);