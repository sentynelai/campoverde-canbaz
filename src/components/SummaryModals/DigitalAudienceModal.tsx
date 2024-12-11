import React from 'react';
import { Users, Facebook, Instagram, Twitter, Linkedin, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStoreData } from '../../hooks/useStoreData';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';

const SOCIAL_MEDIA_CONFIG = {
  digital_audience_facebook: { icon: Facebook, color: '#1877F2', label: 'Facebook' },
  digital_audience_instagram: { icon: Instagram, color: '#E4405F', label: 'Instagram' },
  digital_audience_twitter: { icon: Twitter, color: '#1DA1F2', label: 'Twitter' },
  digital_audience_linkedin: { icon: Linkedin, color: '#0A66C2', label: 'LinkedIn' }
};

export const DigitalAudienceModal: React.FC = () => {
  const { allStores } = useStoreData(); // Use allStores instead of stores
  const { setIsVisible } = useSummaryModals();

  const socialMediaTotals = Object.keys(SOCIAL_MEDIA_CONFIG).reduce((acc, platform) => {
    const total = allStores.reduce((sum, store) => {
      const value = parseInt(store[platform]) || 0;
      return sum + value;
    }, 0);
    return {
      ...acc,
      [platform]: total
    };
  }, {});

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto mx-2"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#00FF9C]" />
          <h2 className="text-lg font-semibold">Digital Audience</h2>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1.5 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(SOCIAL_MEDIA_CONFIG).map(([platform, config], index) => {
          const Icon = config.icon;
          const total = socialMediaTotals[platform];
          
          return (
            <motion.div
              key={platform}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-dark-800/30 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color: config.color }} />
                  <span className="text-dark-200">{config.label}</span>
                </div>
                <span className="font-medium">
                  {formatNumber(total)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};