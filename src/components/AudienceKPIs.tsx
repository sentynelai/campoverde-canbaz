import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';

const PLATFORM_CONFIG = {
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: Facebook,
    field: 'digital_audience_facebook',
    target: 50000
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    icon: Instagram,
    field: 'digital_audience_instagram',
    target: 45000
  },
  twitter: {
    name: 'Twitter',
    color: '#1DA1F2',
    icon: Twitter,
    field: 'digital_audience_twitter',
    target: 40000
  },
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    icon: Linkedin,
    field: 'digital_audience_linkedin',
    target: 35000
  }
};

export const AudienceKPIs: React.FC = () => {
  const { selectedStore } = useStoreSelection();

  if (!selectedStore) return null;

  const totalAudience = Object.values(PLATFORM_CONFIG).reduce(
    (sum, platform) => sum + (parseInt(selectedStore[platform.field]) || 0),
    0
  );

  const totalTarget = Object.values(PLATFORM_CONFIG).reduce(
    (sum, platform) => sum + platform.target,
    0
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`audience-kpis-${selectedStore.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-2"
      >
        <div className="flex items-center gap-2 mb-4 sticky top-0 bg-dark-950/90 py-2">
          <Users className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">Audience KPIs</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(PLATFORM_CONFIG).map(([key, platform], index) => {
            const current = parseInt(selectedStore[platform.field]) || 0;
            const progress = (current / platform.target) * 100;
            const isOnTarget = progress >= 85;
            
            return (
              <motion.div
                key={key}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <platform.icon className="w-4 h-4" style={{ color: platform.color }} />
                    <span className="text-dark-200">{platform.name}</span>
                  </div>
                  <span className={`${isOnTarget ? 'text-[#00FF9C]' : 'text-orange-400'} font-medium`}>
                    {(current / 1000).toFixed(1)}K
                  </span>
                </div>
                
                <div className="relative h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute h-full rounded-full"
                    style={{
                      backgroundColor: platform.color,
                      boxShadow: `0 0 10px ${platform.color}40`
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-dark-400">
                    Progress: <span style={{ color: platform.color }}>
                      {progress.toFixed(1)}%
                    </span>
                  </span>
                  <span className="text-dark-400">
                    Target: {(platform.target / 1000).toFixed(1)}K
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-dark-800/50 sticky bottom-0 bg-dark-950/90 py-2 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Total Audience</span>
              <span className="text-[#00FF9C] font-medium">
                {(totalAudience / 1000).toFixed(1)}K
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Total Target</span>
              <span className="text-dark-200 font-medium">
                {(totalTarget / 1000).toFixed(1)}K
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};