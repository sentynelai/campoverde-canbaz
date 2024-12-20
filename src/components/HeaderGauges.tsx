import React from 'react';
import { DollarSign, Zap, Share2 } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { useStoreData } from '../hooks/useStoreData';
import { motion } from 'framer-motion';
import { calculateTotalSales, formatLargeCurrency } from '../utils/sales';
import { calculateVelocity, getVelocityPercentage } from '../utils/metrics';
import { calculateTotalDigitalAudience } from '../utils/audience';

export const HeaderGauges: React.FC = () => {
  const { stores, allStores } = useStoreData();
  const { selectedStore } = useStoreSelection();

  const calculateMetrics = () => {
    const storeList = selectedStore ? [selectedStore] : allStores;
    
    if (!storeList || storeList.length === 0) {
      return {
        sales: 0,
        velocity: 0,
        velocityPercentage: 0,
        social: 0
      };
    }

    const velocity = calculateVelocity(storeList);
    const totalDigital = calculateTotalDigitalAudience(storeList);
    
    return {
      sales: calculateTotalSales(storeList),
      velocity,
      velocityPercentage: getVelocityPercentage(velocity),
      social: totalDigital
    };
  };

  const metrics = calculateMetrics();
  
  const gauges = [
    {
      label: 'Sales',
      value: formatLargeCurrency(metrics.sales),
      icon: DollarSign,
      color: '[#00FF9C]',
      gauge: selectedStore && allStores.length > 0 ? 
        ((selectedStore.sales_52w || 0) / Math.max(...allStores.map(s => parseFloat(s.sales_52w || '0')))) * 100 : 100
    },
    {
      label: 'Velocity',
      value: `$${metrics.velocity.toFixed(2)}`,
      icon: Zap,
      color: 'blue-400',
      gauge: metrics.velocityPercentage
    },
    {
      label: 'Digital',
      value: `${(metrics.social / 1000000).toFixed(1)}M`,
      icon: Share2,
      color: 'purple-400',
      gauge: selectedStore && allStores.length > 0 ? 
        ((selectedStore.digital_audience || 0) / Math.max(...allStores.map(s => s.digital_audience || 0))) * 100 : 92
    }
  ];

  return (
    <div className="flex items-center gap-4">
      {gauges.map((gauge, index) => (
        <motion.div
          key={gauge.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-dark-800"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="45%"
                className={`stroke-${gauge.color}`}
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - (gauge.gauge || 0) / 100) }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <gauge.icon className={`w-4 h-4 text-${gauge.color}`} />
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-dark-400">{gauge.label}</p>
            <p className="text-sm font-semibold">{gauge.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};