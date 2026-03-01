import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HealthInsight {
  id: string;
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'info' | 'achievement';
  category: 'nutrition' | 'fitness' | 'sleep' | 'mental' | 'general';
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  icon: string;
  color: string;
  timestamp: string;
}

const HealthInsightsCard: React.FC = () => {
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: '📊' },
    { id: 'nutrition', name: 'Nutrition', icon: '🍎' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'sleep', name: 'Sleep', icon: '😴' },
    { id: 'mental', name: 'Mental', icon: '🧠' },
    { id: 'general', name: 'General', icon: '💡' }
  ];

  const generateInsights = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockInsights: HealthInsight[] = [
      {
        id: '1',
        title: 'Great Hydration Progress!',
        description: 'You\'ve increased your water intake by 25% this week. Keep it up to reach your daily goal of 8 glasses.',
        type: 'positive',
        category: 'nutrition',
        impact: 'high',
        actionable: true,
        icon: '💧',
        color: '#10b981',
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Sleep Quality Alert',
        description: 'Your sleep duration has decreased by 30 minutes over the past 3 days. Consider establishing a consistent bedtime routine.',
        type: 'warning',
        category: 'sleep',
        impact: 'medium',
        actionable: true,
        icon: '⚠️',
        color: '#f59e0b',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        title: 'Exercise Streak Achievement',
        description: 'Congratulations! You\'ve maintained a 7-day exercise streak. This consistency will help you reach your fitness goals faster.',
        type: 'achievement',
        category: 'fitness',
        impact: 'high',
        actionable: false,
        icon: '🏆',
        color: '#8b5cf6',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        title: 'Nutrition Balance Tip',
        description: 'Your protein intake is excellent, but consider adding more fiber-rich foods to improve digestion and satiety.',
        type: 'info',
        category: 'nutrition',
        impact: 'medium',
        actionable: true,
        icon: '🥗',
        color: '#3b82f6',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        title: 'Stress Level Insight',
        description: 'Your stress levels appear elevated. Try incorporating 10 minutes of meditation or deep breathing exercises daily.',
        type: 'warning',
        category: 'mental',
        impact: 'high',
        actionable: true,
        icon: '🧘',
        color: '#ef4444',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '6',
        title: 'Weekly Progress Summary',
        description: 'You\'ve completed 85% of your weekly health goals. Focus on improving sleep quality to reach 100%.',
        type: 'info',
        category: 'general',
        impact: 'medium',
        actionable: true,
        icon: '📈',
        color: '#06b6d4',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ];

    setInsights(mockInsights);
    setIsLoading(false);
  };

  useEffect(() => {
    generateInsights();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      case 'achievement': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getTypeBackground = (type: string) => {
    switch (type) {
      case 'positive': return '#f0fdf4';
      case 'warning': return '#fffbeb';
      case 'info': return '#eff6ff';
      case 'achievement': return '#faf5ff';
      default: return '#f9fafb';
    }
  };

  const getTypeBorder = (type: string) => {
    switch (type) {
      case 'positive': return '#bbf7d0';
      case 'warning': return '#fed7aa';
      case 'info': return '#bfdbfe';
      case 'achievement': return '#e9d5ff';
      default: return '#e5e7eb';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const filteredInsights = selectedCategory === 'all'
    ? insights
    : insights.filter(insight => insight.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 h-full flex flex-col relative overflow-hidden group"
    >
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-extrabold text-gray-800 m-0 flex items-center gap-2">
          🧠 Health Insights
        </h3>
        <button
          onClick={generateInsights}
          disabled={isLoading}
          className={`p-2 rounded-lg transition-all border shadow-sm ${isLoading
              ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
              : 'bg-white bg-opacity-80 text-primary-600 border-primary-100 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 active:scale-95'
            }`}
          title="Refresh Insights"
        >
          {isLoading ? <span className="animate-spin inline-block">⏳</span> : '🔄'}
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide relative z-10 w-full snap-x">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 snap-center ${selectedCategory === category.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white bg-opacity-60 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100 shadow-sm'
              }`}
          >
            <span className="text-sm">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center p-8 text-gray-500 relative z-10 flex flex-col items-center flex-grow justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="m-0 font-medium animate-pulse text-sm">Analyzing your health data...</p>
        </div>
      )}

      {!isLoading && (
        <div className="flex flex-col gap-3 overflow-y-auto pr-1 flex-grow relative z-10" style={{ maxHeight: '400px' }}>
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start p-4 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group/insight"
              style={{
                borderLeft: `4px solid ${getTypeColor(insight.type)}`,
                borderTop: '1px solid rgba(255,255,255,0.5)',
                borderRight: '1px solid rgba(255,255,255,0.5)',
                borderBottom: '1px solid rgba(255,255,255,0.5)'
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3 flex-shrink-0 shadow-sm bg-opacity-20 transition-transform duration-300 group-hover/insight:scale-110"
                style={{ backgroundColor: `${getTypeColor(insight.type)}20`, color: getTypeColor(insight.type) }}
              >
                {insight.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h4 className="text-sm font-bold text-gray-800 m-0 truncate">
                    {insight.title}
                  </h4>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm"
                      style={{ backgroundColor: getTypeColor(insight.type) }}
                    >
                      {insight.impact}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                      {formatTimestamp(insight.timestamp)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 m-0 mb-2 leading-relaxed font-medium">
                  {insight.description}
                </p>
                {insight.actionable && (
                  <div
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide inline-flex bg-opacity-10 px-2 py-1 rounded-md"
                    style={{ color: getTypeColor(insight.type), backgroundColor: `${getTypeColor(insight.type)}15` }}
                  >
                    <span>💡</span>
                    <span>Actionable insight</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && filteredInsights.length === 0 && (
        <div className="text-center p-8 text-gray-500 bg-gray-50 bg-opacity-50 rounded-xl border border-dashed border-gray-300 relative z-10 m-auto mt-4 mb-4">
          <div className="text-4xl mb-3 opacity-50">🧠</div>
          <p className="m-0 mb-4 text-sm font-medium">
            No insights available for this category.
          </p>
          <button
            onClick={generateInsights}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm text-sm"
          >
            Generate Insights
          </button>
        </div>
      )}

      {/* Summary Stats */}
      {!isLoading && insights.length > 0 && (
        <div className="mt-4 p-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl border border-white border-opacity-60 relative z-10 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-primary-500">
                {insights.filter(i => i.type === 'positive').length}
              </div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Positive
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-500">
                {insights.filter(i => i.type === 'warning').length}
              </div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Warnings
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-500">
                {insights.filter(i => i.type === 'achievement').length}
              </div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Achievements
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-500">
                {insights.filter(i => i.actionable).length}
              </div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actionable
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HealthInsightsCard;
