import React from 'react';
import { motion } from 'framer-motion';
import { useStoreSelection } from '../../hooks/useStoreSelection';

interface StoreOverlayProps {
  children: React.ReactNode;
}

export const StoreOverlay: React.FC<StoreOverlayProps> = ({ children }) => {
  const { setSelectedStore } = useStoreSelection();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-[5]"
        onClick={() => setSelectedStore(null)}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed top-24 left-0 right-0 z-10"
      >
        <div className="px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-dark-700 scrollbar-track-dark-900">
          <div className="flex gap-4 pb-4 min-w-max">
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
};