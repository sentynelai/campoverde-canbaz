import React from 'react';
import { Building2, Package, Share2, BarChart } from 'lucide-react';
import { useStoreData } from '../hooks/useStoreData';
import { useProductKPIs } from '../hooks/useProductKPIs';
import { motion } from 'framer-motion';
import { useSummaryModals } from '../contexts/SummaryModalsContext';

export const SocialFooter: React.FC = () => {
  const { allStores } = useStoreData();
  const { products } = useProductKPIs();
  const { isVisible, setIsVisible } = useSummaryModals();

  const metrics = [
    { 
      icon: Building2,
      label: 'Total Stores',
      value: allStores.length.toLocaleString(),
      color: '#00FF9C'
    },
    { 
      icon: Package,
      label: 'Products Tracked',
      value: products.length.toLocaleString(),
      color: '#00FF9C'
    },
    {
      icon: Share2,
      label: 'Audience Reach',
      value: '92.5%',
      color: '#00FF9C'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-950/60 backdrop-blur-md py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              className="relative group"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2">
                <metric.icon 
                  className="w-5 h-5" 
                  style={{ color: metric.color }} 
                />
                <div>
                  <p className="text-sm text-dark-400">{metric.label}</p>
                  <p className="text-sm font-medium">{metric.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-[#00FF9C] text-dark-950 rounded-lg hover:bg-[#00FF9C]/90 transition-colors"
        >
          <BarChart className="w-4 h-4" />
          <span className="font-medium">Main KPIs</span>
        </motion.button>
      </div>
    </div>
  );
};