import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
}

const HealthMetricsCard: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: 'steps',
      name: 'Daily Steps',
      value: 8432,
      unit: 'steps',
      target: 10000,
      trend: 'up',
      icon: '👟',
      color: '#3b82f6'
    },
    {
      id: 'calories',
      name: 'Calories Burned',
      value: 1247,
      unit: 'kcal',
      target: 1500,
      trend: 'up',
      icon: '🔥',
      color: '#ef4444'
    },
    {
      id: 'water',
      name: 'Water Intake',
      value: 6.2,
      unit: 'L',
      target: 8,
      trend: 'stable',
      icon: '💧',
      color: '#06b6d4'
    },
    {
      id: 'sleep',
      name: 'Sleep Duration',
      value: 7.5,
      unit: 'hrs',
      target: 8,
      trend: 'down',
      icon: '😴',
      color: '#8b5cf6'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const getProgressPercentage = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#10b981';
      case 'down': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const refreshMetrics = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update metrics with some variation
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + (Math.random() - 0.5) * metric.value * 0.1,
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
    })));

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold text-gray-800 m-0 flex items-center gap-2">
          📊 Health Metrics
        </h3>
        <button
          onClick={refreshMetrics}
          disabled={isLoading}
          className={`p-2 rounded-lg transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed bg-gray-100' : 'bg-gray-50 hover:bg-gray-200 border border-gray-200 shadow-sm hover:shadow active:scale-95'}`}
        >
          {isLoading ? '⏳' : '🔄'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.03, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{metric.icon}</span>
                <span className="text-sm font-semibold text-gray-700">
                  {metric.name}
                </span>
              </div>
              <div
                className="flex items-center gap-1 text-xs"
                style={{ color: getTrendColor(metric.trend) }}
              >
                <span>{getTrendIcon(metric.trend)}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <span
                className="text-2xl font-black"
                style={{ color: metric.color }}
              >
                {metric.value.toFixed(metric.unit === 'L' ? 1 : 0)}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {metric.unit}
              </span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-500">
                Target: {metric.target} {metric.unit}
              </span>
              <span className="text-xs font-bold text-gray-700">
                {getProgressPercentage(metric.value, metric.target).toFixed(0)}%
              </span>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage(metric.value, metric.target)}%` }}
                transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                className="h-full rounded-full"
                style={{ backgroundColor: metric.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <span className="text-sm font-bold text-blue-800">
            Today's Insight
          </span>
        </div>
        <p className="text-xs text-blue-900 m-0 leading-relaxed font-medium">
          You're doing great with your daily steps! Try to increase your water intake to reach your hydration goal.
        </p>
      </div>
    </motion.div>
  );
};

export default HealthMetricsCard;
