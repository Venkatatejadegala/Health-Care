import * as React from 'react';
import { useState } from 'react';

const NutritionTrackerCard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  const nutritionData = {
    calories: { consumed: 1850, goal: 2200, unit: 'kcal' },
    protein: { consumed: 85, goal: 120, unit: 'g' },
    carbs: { consumed: 180, goal: 250, unit: 'g' },
    fat: { consumed: 65, goal: 80, unit: 'g' },
    fiber: { consumed: 25, goal: 30, unit: 'g' },
    water: { consumed: 6.5, goal: 8, unit: 'glasses' }
  };

  const getProgressPercentage = (consumed: number, goal: number) => {
    return Math.min((consumed / goal) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return '#10b981'; // green
    if (percentage >= 70) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      height: '100%'
    }}>
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
          margin: 0
        }}>
          Nutrition Tracker
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              style={{
                backgroundColor: selectedPeriod === period.id ? '#3b82f6' : '#f3f4f6',
                color: selectedPeriod === period.id ? 'white' : '#374151',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                if (selectedPeriod !== period.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseOut={(e) => {
                if (selectedPeriod !== period.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#dc2626',
            marginBottom: '0.25rem'
          }}>
            {nutritionData.calories.consumed}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#991b1b'
          }}>
            Calories Consumed
          </div>
        </div>
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#16a34a',
            marginBottom: '0.25rem'
          }}>
            {nutritionData.water.consumed}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#166534'
          }}>
            Glasses of Water
          </div>
        </div>
      </div>

      {/* Macro Breakdown */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '1rem'
        }}>
          Macro Breakdown
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Object.entries(nutritionData).filter(([key]) => 
            ['protein', 'carbs', 'fat', 'fiber'].includes(key)
          ).map(([key, data]) => {
            const percentage = getProgressPercentage(data.consumed, data.goal);
            const color = getProgressColor(percentage);
            
            return (
              <div key={key}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.25rem'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    textTransform: 'capitalize'
                  }}>
                    {key}
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    {data.consumed}/{data.goal} {data.unit}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          style={{
            flex: 1,
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
        >
          ➕ Log Meal
        </button>
        <button
          style={{
            flex: 1,
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            padding: '0.75rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
            e.currentTarget.style.borderColor = '#9ca3af';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
        >
          📊 View Details
        </button>
      </div>
    </div>
  );
};

export default NutritionTrackerCard;