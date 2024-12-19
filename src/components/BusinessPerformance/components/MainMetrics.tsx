import React from 'react';
import { motion } from 'framer-motion';
import type { MetricData } from '../types';

interface MainMetricsProps {
  metrics: MetricData[];
}

export const MainMetrics: React.FC<MainMetricsProps> = ({ metrics }) => {
  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-dark-800/30 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-${metric.color}/20`}>
                <metric.icon className={`w-5 h-5 text-${metric.color}`} />
              </div>
              <div>
                <p className="text-sm text-dark-400">{metric.label}</p>
                <p className="text-lg font-semibold">{metric.value}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );