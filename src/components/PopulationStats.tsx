import React from 'react';
import { Users } from 'lucide-react';
import { STORE_DATA } from '../data/stores';

export const PopulationStats: React.FC = () => {
  const sortedStores = [...STORE_DATA].sort((a, b) => b.digitalAudience - a.digitalAudience);
  const maxDigitalAudience = Math.max(...STORE_DATA.map(store => store.digitalAudience));

  return (
    <div className="glass rounded-xl p-4 md:p-6 backdrop-blur-md bg-dark-950/20 border border-dark-800/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#00FF9C]/20">
          <Users className="w-5 h-5 text-[#00FF9C]" />
        </div>
        <h2 className="text-xl font-semibold">Digital Audience Rankings</h2>
      </div>

      <div className="space-y-4">
        {sortedStores.map((store, index) => {
          const percentage = (store.digitalAudience / maxDigitalAudience) * 100;
          const audienceIcons = Math.round((store.digitalAudience / maxDigitalAudience) * 10);

          return (
            <div key={store.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-dark-400">Store #{store.id}</span>
                <span className="text-sm font-medium">{store.digitalAudience.toLocaleString()}</span>
              </div>
              
              {/* Pictographic representation */}
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <Users 
                    key={i}
                    className={`w-4 h-4 ${i < audienceIcons ? 'text-[#00FF9C]' : 'text-dark-700'}`}
                  />
                ))}
              </div>

              {/* Animated progress bar */}
              <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00FF9C] rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${percentage}%`,
                    boxShadow: '0 0 10px rgba(0, 255, 156, 0.5)'
                  }} 
                />
              </div>

              {/* Additional metrics */}
              <div className="flex justify-between text-sm text-dark-400">
                <span>Growth: <span className={store.trend >= 0 ? 'text-[#00FF9C]' : 'text-red-400'}>
                  {store.trend >= 0 ? '+' : ''}{store.trend}%
                </span></span>
                <span>Sales: ${(store.sales / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};