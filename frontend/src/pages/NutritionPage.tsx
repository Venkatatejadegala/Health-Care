import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const NutritionPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [meals, setMeals] = useState([
    {
      id: 1,
      type: 'Breakfast',
      time: '08:00',
      items: [
        { name: 'Oatmeal with berries', calories: 250, protein: 8, carbs: 45, fat: 5 },
        { name: 'Greek yogurt', calories: 120, protein: 15, carbs: 8, fat: 2 }
      ]
    },
    {
      id: 2,
      type: 'Lunch',
      time: '13:00',
      items: [
        { name: 'Grilled chicken salad', calories: 320, protein: 25, carbs: 12, fat: 18 },
        { name: 'Quinoa', calories: 180, protein: 6, carbs: 32, fat: 3 }
      ]
    },
    {
      id: 3,
      type: 'Dinner',
      time: '19:00',
      items: [
        { name: 'Salmon fillet', calories: 280, protein: 30, carbs: 0, fat: 16 },
        { name: 'Steamed broccoli', calories: 50, protein: 4, carbs: 8, fat: 1 }
      ]
    }
  ]);

  const totalCalories = meals.reduce((total, meal) => 
    total + meal.items.reduce((mealTotal, item) => mealTotal + item.calories, 0), 0
  );

  const totalProtein = meals.reduce((total, meal) => 
    total + meal.items.reduce((mealTotal, item) => mealTotal + item.protein, 0), 0
  );

  const totalCarbs = meals.reduce((total, meal) => 
    total + meal.items.reduce((mealTotal, item) => mealTotal + item.carbs, 0), 0
  );

  const totalFat = meals.reduce((total, meal) => 
    total + meal.items.reduce((mealTotal, item) => mealTotal + item.fat, 0), 0
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            color: '#1f2937', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            margin: 0
          }}>
            🍎 Nutrition Tracker
          </h1>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          />
        </div>

        {/* Nutrition Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
            <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Calories
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
              {totalCalories}
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              of 2000 goal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💪</div>
            <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Protein
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
              {totalProtein}g
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              of 150g goal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌾</div>
            <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Carbs
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }}>
              {totalCarbs}g
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              of 250g goal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🥑</div>
            <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Fat
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
              {totalFat}g
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
              of 65g goal
            </p>
          </motion.div>
        </div>

        {/* Meals List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {meal.type}
                </h3>
                <span style={{
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem'
                }}>
                  {meal.time}
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {meal.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div>
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {item.name}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '0.25rem'
                      }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {item.calories} cal
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {item.protein}g protein
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {item.carbs}g carbs
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {item.fat}g fat
                        </span>
                      </div>
                    </div>
                    <button
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button
                style={{
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                + Add Food Item
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
