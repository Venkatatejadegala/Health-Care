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
          📊 Health Metrics
        </h3>
        <button
          onClick={refreshMetrics}
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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              padding: '1rem',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{metric.icon}</span>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {metric.name}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: getTrendColor(metric.trend),
                fontSize: '0.75rem'
              }}>
                <span>{getTrendIcon(metric.trend)}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.25rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: metric.color
              }}>
                {metric.value.toFixed(metric.unit === 'L' ? 1 : 0)}
              </span>
              <span style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                {metric.unit}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                Target: {metric.target} {metric.unit}
              </span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                {getProgressPercentage(metric.value, metric.target).toFixed(0)}%
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#e5e7eb',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage(metric.value, metric.target)}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                style={{
                  height: '100%',
                  backgroundColor: metric.color,
                  borderRadius: '3px'
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f0f9ff',
        borderRadius: '0.5rem',
        border: '1px solid #bae6fd'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontSize: '1rem' }}>💡</span>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#1e40af'
          }}>
            Today's Insight
          </span>
        </div>
        <p style={{
          fontSize: '0.75rem',
          color: '#1e40af',
          margin: 0,
          lineHeight: '1.4'
        }}>
          You're doing great with your daily steps! Try to increase your water intake to reach your hydration goal.
        </p>
      </div>
    </motion.div>
  );
};

export default HealthMetricsCard;
