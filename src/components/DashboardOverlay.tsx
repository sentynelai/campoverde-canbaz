import React from 'react';
import { Globe2, Search, Settings } from 'lucide-react';
import { StoreStats } from './StoreStats';
import { RegionStats } from './RegionStats';
import { PerformanceMetrics } from './PerformanceMetrics';

export const DashboardOverlay: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950/80 to-gray-950/40">
      <nav className="border-b border-gray-800/50 bg-gray-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Globe2 className="h-8 w-8 text-teal-400" />
              <span className="ml-2 text-xl font-semibold text-white">Walmart Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-800/50">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-800/50">
                <Settings className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <StoreStats />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <RegionStats />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <PerformanceMetrics />
          </div>
        </div>
      </main>
    </div>
  );
};