import React from 'react';
import { Activity, TrendingUp, Users } from 'lucide-react';

export const BottomMetrics: React.FC = () => {
  const metrics = [
    {
      label: 'Customer Growth',
      value: '32%',
      icon: Users,
      color: '#00FF9C',
      gauge: 32
    },
    {
      label: 'Revenue Trend',
      value: '67%',
      icon: TrendingUp,
      color: '#00FF9C',
      gauge: 67
    },
    {
      label: 'Store Performance',
      value: '89%',
      icon: Activity,
      color: '#00FF9C',
      gauge: 89
    }
  ];

  return (
    <div className="glass rounded-xl p-4 md:p-6 backdrop-blur-md bg-dark-950/20 border border-dark-800/20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00FF9C]/20">
                  <metric.icon className="w-5 h-5 text-[#00FF9C]" />
                </div>
                <div>
                  <p className="text-sm text-dark-400">{metric.label}</p>
                  <p className="text-xl font-semibold">{metric.value}</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-20 md:h-24 w-20 md:w-24 mx-auto">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-dark-800"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  className="stroke-[#00FF9C]"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - metric.gauge / 100)}`}
                  style={{
                    transition: 'stroke-dashoffset 1s ease-in-out',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">{metric.gauge}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};