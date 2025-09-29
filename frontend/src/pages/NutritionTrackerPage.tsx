import * as React from 'react';
import { useState, useEffect } from 'react';
import { nutritionService, Meal, DailyNutrition } from '../services/nutritionService';
import toast from 'react-hot-toast';

const NutritionTrackerPage: React.FC = () => {
  const [mealName, setMealName] = useState('');
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load daily nutrition data
  useEffect(() => {
    loadDailyNutrition();
  }, [selectedDate]);

  const loadDailyNutrition = () => {
    const data = nutritionService.getDailyNutrition(selectedDate);
    setDailyNutrition(data);
  };

  const handleAddMeal = async () => {
    if (!mealName.trim()) {
      toast.error('Please enter a meal name');
      return;
    }

    setIsAddingMeal(true);
    try {
      await nutritionService.addMeal(mealName.trim());
      setMealName('');
      loadDailyNutrition();
      toast.success(`Added ${mealName} to your meals!`);
    } catch (error) {
      toast.error('Failed to add meal. Please try again.');
    } finally {
      setIsAddingMeal(false);
    }
  };

  const handleRemoveMeal = (mealId: string) => {
    nutritionService.removeMeal(mealId);
    loadDailyNutrition();
    toast.success('Meal removed successfully!');
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return '#ef4444'; // Red - over goal
    if (percentage >= 80) return '#f59e0b'; // Yellow - close to goal
    return '#10b981'; // Green - good progress
  };

  if (!dailyNutrition) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.125rem',
        color: '#6b7280'
      }}>
        Loading nutrition data...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            🍎 Nutrition Tracker
          </h1>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Add Meal Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            ➕ Add Meal
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Enter meal name (e.g., Grilled Chicken Breast, Rice Bowl, Apple)"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddMeal()}
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleAddMeal}
              disabled={isAddingMeal || !mealName.trim()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: isAddingMeal || !mealName.trim() ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: isAddingMeal || !mealName.trim() ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {isAddingMeal ? 'Adding...' : 'Add Meal'}
            </button>
          </div>
          
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginTop: '0.5rem',
            margin: 0
          }}>
            💡 AI will analyze your meal and provide accurate nutrition information
          </p>
        </div>

        {/* Daily Progress */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { key: 'calories', label: 'Calories', unit: 'kcal', icon: '🔥' },
            { key: 'protein', label: 'Protein', unit: 'g', icon: '💪' },
            { key: 'carbs', label: 'Carbs', unit: 'g', icon: '🌾' },
            { key: 'fat', label: 'Fat', unit: 'g', icon: '🥑' },
            { key: 'fiber', label: 'Fiber', unit: 'g', icon: '🥬' }
          ].map(({ key, label, unit, icon }) => {
            const current = dailyNutrition[`total${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof DailyNutrition] as number;
            const goal = dailyNutrition.goals[key as keyof typeof dailyNutrition.goals];
            const remaining = dailyNutrition.remaining[key as keyof typeof dailyNutrition.remaining];
            const percentage = getProgressPercentage(current, goal);
            
            return (
              <div key={key} style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {icon} {label}
                  </h3>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                
                <div style={{
                  marginBottom: '0.5rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '0.25rem'
                  }}>
                    <span>{current.toFixed(0)} {unit}</span>
                    <span>{goal} {unit}</span>
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
                      backgroundColor: getProgressColor(percentage),
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                
                <div style={{
                  fontSize: '0.75rem',
                  color: remaining > 0 ? '#6b7280' : '#ef4444',
                  fontWeight: '500'
                }}>
                  {remaining > 0 ? `${remaining.toFixed(0)} ${unit} remaining` : 'Goal reached!'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Meals List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            📋 Today's Meals ({dailyNutrition.meals.length})
          </h2>
          
          {dailyNutrition.meals.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
              <p style={{ fontSize: '1.125rem', margin: 0 }}>No meals added yet</p>
              <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                Add your first meal above to start tracking your nutrition!
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {dailyNutrition.meals.map((meal) => (
                <div key={meal.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.25rem'
                    }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {meal.name}
                      </h3>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        {formatTime(meal.timestamp)}
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <span>🔥 {meal.calories} cal</span>
                      <span>💪 {meal.protein}g protein</span>
                      <span>🌾 {meal.carbs}g carbs</span>
                      <span>🥑 {meal.fat}g fat</span>
                      <span>🥬 {meal.fiber}g fiber</span>
                    </div>
                    
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                      marginTop: '0.25rem'
                    }}>
                      {meal.serving} • {meal.confidence}% confidence
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveMeal(meal.id)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                  >
                    🗑️ Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionTrackerPage;