'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Lightbulb, 
  TrendingUp, 
  Droplets, 
  Moon, 
  Apple,
  Dumbbell,
  Brain,
  ArrowRight,
  BookOpen,
  Star,
  Clock
} from 'lucide-react';

const HealthTipsCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', count: 12 },
    { id: 'nutrition', name: 'Nutrition', count: 5 },
    { id: 'exercise', name: 'Exercise', count: 4 },
    { id: 'wellness', name: 'Wellness', count: 3 }
  ];

  const healthTips = [
    {
      id: 1,
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain optimal body function and energy levels.',
      category: 'wellness',
      priority: 'high',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      readTime: '2 min read',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Quality Sleep Matters',
      description: 'Aim for 7-9 hours of sleep per night to support recovery and cognitive function.',
      category: 'wellness',
      priority: 'high',
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      readTime: '3 min read',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Balanced Nutrition',
      description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your diet.',
      category: 'nutrition',
      priority: 'high',
      icon: Apple,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      readTime: '4 min read',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Regular Exercise',
      description: 'Engage in at least 150 minutes of moderate-intensity exercise per week.',
      category: 'exercise',
      priority: 'medium',
      icon: Dumbbell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      readTime: '3 min read',
      rating: 4.6
    },
    {
      id: 5,
      title: 'Mental Health',
      description: 'Practice mindfulness and stress management techniques for overall well-being.',
      category: 'wellness',
      priority: 'medium',
      icon: Brain,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      readTime: '5 min read',
      rating: 4.8
    }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Tips</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Personalized wellness recommendations</p>
          </div>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Health Tips */}
      <div className="space-y-4">
        {filteredTips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 ${tip.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${tip.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{tip.title}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tip.priority)}`}>
                      {tip.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tip.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {tip.readTime}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {tip.rating}
                      </span>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                      Read more →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <BookOpen className="w-4 h-4 inline mr-1" />
            Expert-curated health advice
          </div>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            View all tips →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTipsCard;
