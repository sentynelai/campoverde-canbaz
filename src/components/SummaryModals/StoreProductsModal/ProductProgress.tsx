import React from 'react';
import { motion } from 'framer-motion';

export const ProductProgress: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-dark-400">Progress</span>
        <span className="text-[#00FF9C]">80%</span>
      </div>
      <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80%' }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#00FF9C] rounded-full"
        />
      </div>
    </div>
  );
};