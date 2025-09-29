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
      style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        height: '100%'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🧠 Health Insights
        </h3>
        <button
          onClick={generateInsights}
          disabled={isLoading}
          style={{
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: isLoading ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }
          }}
          onMouseOut={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
        >
          {isLoading ? '⏳' : '🔄'}
        </button>
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem'
      }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={{
              backgroundColor: selectedCategory === category.id ? '#3b82f6' : '#f3f4f6',
              color: selectedCategory === category.id ? 'white' : '#374151',
              border: 'none',
              borderRadius: '9999px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
            onMouseOver={(e) => {
              if (selectedCategory !== category.id) {
                e.currentTarget.style.backgroundColor = '#e5e7eb';
              }
            }}
            onMouseOut={(e) => {
              if (selectedCategory !== category.id) {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }
            }}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {isLoading && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#6b7280'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ margin: 0 }}>Analyzing your health data...</p>
        </div>
      )}

      {!isLoading && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{
                backgroundColor: getTypeBackground(insight.type),
                borderRadius: '0.75rem',
                padding: '1rem',
                border: `1px solid ${getTypeBorder(insight.type)}`,
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: getTypeColor(insight.type),
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0
                }}>
                  {insight.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.25rem'
                  }}>
                    <h4 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: 0
                    }}>
                      {insight.title}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <div style={{
                        backgroundColor: getTypeColor(insight.type),
                        color: 'white',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                      }}>
                        {insight.impact}
                      </div>
                      <span style={{
                        fontSize: '0.625rem',
                        color: '#6b7280'
                      }}>
                        {formatTimestamp(insight.timestamp)}
                      </span>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.4'
                  }}>
                    {insight.description}
                  </p>
                  {insight.actionable && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.625rem',
                      color: getTypeColor(insight.type),
                      fontWeight: '500'
                    }}>
                      <span>💡</span>
                      <span>Actionable insight</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && filteredInsights.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
          <p style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>
            No insights available for this category.
          </p>
          <button
            onClick={generateInsights}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Generate Insights
          </button>
        </div>
      )}

      {/* Summary Stats */}
      {!isLoading && insights.length > 0 && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '0.5rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#3b82f6'
              }}>
                {insights.filter(i => i.type === 'positive').length}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                Positive
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#f59e0b'
              }}>
                {insights.filter(i => i.type === 'warning').length}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                Warnings
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#8b5cf6'
              }}>
                {insights.filter(i => i.type === 'achievement').length}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                Achievements
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#10b981'
              }}>
                {insights.filter(i => i.actionable).length}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
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
