'use client';

import React, { useState } from 'react';
import { 
  Utensils, 
  Plus, 
  Target, 
  TrendingUp, 
  Droplets, 
  Flame,
  Zap,
  Apple,
  ArrowRight,
  Calendar,
  BarChart3
} from 'lucide-react';

const NutritionTrackerCard: React.FC = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const meals = [
    { id: 'breakfast', name: 'Breakfast', time: '8:00 AM', calories: 420, icon: '🌅' },
    { id: 'lunch', name: 'Lunch', time: '1:00 PM', calories: 580, icon: '☀️' },
    { id: 'dinner', name: 'Dinner', time: '7:00 PM', calories: 650, icon: '🌙' },
    { id: 'snacks', name: 'Snacks', time: '3:00 PM', calories: 150, icon: '🍎' }
  ];

  const nutritionGoals = {
    calories: { target: 2000, current: 1800, remaining: 200 },
    protein: { target: 150, current: 120, remaining: 30 },
    carbs: { target: 250, current: 180, remaining: 70 },
    fat: { target: 65, current: 45, remaining: 20 }
  };

  const recentFoods = [
    { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15 },
    { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0 }
  ];

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'text-green-600';
    if (percentage >= 70 && percentage < 90) return 'text-yellow-600';
    if (percentage > 110) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressBarColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'bg-green-500';
    if (percentage >= 70 && percentage < 90) return 'bg-yellow-500';
    if (percentage > 110) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 nutrition-gradient rounded-lg flex items-center justify-center">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Nutrition Tracker</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track your daily nutrition goals</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Food</span>
        </button>
      </div>

      {/* Nutrition Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(nutritionGoals).map(([nutrient, data]) => (
          <div key={nutrient} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{nutrient}</h3>
              <div className={`text-sm font-semibold ${getProgressColor(data.current, data.target)}`}>
                {Math.round((data.current / data.target) * 100)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{data.current}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">/ {data.target}g goal</div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressBarColor(data.current, data.target)}`}
                style={{ width: `${Math.min((data.current / data.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Meals Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Meals</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {meals.map((meal) => (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMeal === meal.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{meal.icon}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{meal.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{meal.time}</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">{meal.calories}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">cal</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Foods */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Foods</h3>
        <div className="space-y-3">
          {recentFoods.map((food, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Apple className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{food.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">{food.calories} cal</div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Flame className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-gray-900 dark:text-white">1,800</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Calories</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Zap className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-gray-900 dark:text-white">120g</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Protein</div>
        </div>
        <div className="text-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-gray-900 dark:text-white">6.2L</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Water</div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <BarChart3 className="w-4 h-4 inline mr-1" />
            Track your nutrition progress
          </div>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            View details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NutritionTrackerCard;
