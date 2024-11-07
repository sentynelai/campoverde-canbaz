import React from 'react';
import { StoreStats } from './StoreStats';
import { RegionStats } from './RegionStats';
import { PopulationStats } from './PopulationStats';

interface MetricsOverlayProps {
  position: 'left' | 'right';
}

export const MetricsOverlay: React.FC<MetricsOverlayProps> = ({ position }) => {
  return (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4 md:p-6 backdrop-blur-md bg-dark-950/20 border border-dark-800/20">
        {position === 'left' ? <StoreStats /> : <RegionStats />}
      </div>
      {position === 'right' && (
        <PopulationStats />
      )}
    </div>
  );
};