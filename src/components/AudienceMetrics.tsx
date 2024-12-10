import React from 'react';
import { Store, DollarSign, Users, ArrowRight, X } from 'lucide-react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { motion } from 'framer-motion';

export const AudienceMetrics: React.FC = () => {
  const { selectedStore, setSelectedStore } = useStoreSelection();

  if (!selectedStore) return null;

  const metrics = [
    { 
      label: 'Total CV Sales', 
      value: `$${(selectedStore.campoverde_sales / 1000000).toFixed(1)}M`, 
      icon: DollarSign, 
      color: '[#00FF9C]' 
    },
    { 
      label: 'Nearby Population', 
      value: `${(parseInt(selectedStore['poblacion (10km)']) / 1000).toFixed(1)}K`, 
      icon: Users, 
      color: 'blue-500' 
    },
    { 
      label: 'Digital Audience', 
      value: `${(selectedStore.digitalAudience / 1000).toFixed(1)}K`, 
      icon: ArrowRight, 
      color: 'orange-500' 
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-w-[384px] bg-dark-950/90 backdrop-blur-lg rounded-xl border border-dark-800/50 p-4 max-h-[calc(100vh-200px)] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-dark-950/90 py-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#00FF9C]" />
            <h2 className="text-lg font-semibold">Store Analytics</h2>
          </div>
          <span className="text-sm text-dark-400 mt-1">{selectedStore.name} #{selectedStore.id}</span>
          <span className="text-xs text-dark-400">{selectedStore.city}, {selectedStore.state}</span>
        </div>
        <button
          onClick={() => setSelectedStore(null)}
          className="p-1.5 hover:bg-dark-800/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {metrics.map((item, index) => (
          <motion.div
            key={`${selectedStore.id}-${item.label}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between bg-dark-800/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg bg-${item.color}/20`}>
                <item.icon className={`w-4 h-4 text-${item.color}`} />
              </div>
              <span className="text-dark-400 text-sm">{item.label}</span>
            </div>
            <span className={`text-sm font-medium ${item.label === 'Satisfaction' ? `text-${item.color}` : ''}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-4 p-3 bg-[#00FF9C]/5 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-xs text-[#00FF9C] mb-2">Google Store Reviews</div>
        <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00FF9C] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(selectedStore.positive / selectedStore.reviews) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-dark-400">
          <span>{selectedStore.positive} positive</span>
          <span>{selectedStore.negative} negative</span>
        </div>
      </motion.div>

      <motion.div
        className="mt-4 p-4 bg-dark-800/30 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-medium mb-3">Portfolio sales:</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">FF Sales</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">Hispanic sales</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">Con gusto Sales</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-dark-400">GrabNGo sales</span>
            <span>$0</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};