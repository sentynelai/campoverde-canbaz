import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TotalSalesModal } from './TotalSalesModal';
import { StoreProductsModal } from './StoreProductsModal';
import { DigitalAudienceModal } from './DigitalAudienceModal';
import { useSummaryModals } from '../../contexts/SummaryModalsContext';

export const SummaryModals: React.FC = () => {
  const { isVisible } = useSummaryModals();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 left-0 right-0 z-10"
        >
          <div className="px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-dark-700 scrollbar-track-dark-900">
            <div className="flex gap-4 pb-4 min-w-max">
              <TotalSalesModal />
              <StoreProductsModal />
              <DigitalAudienceModal />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};