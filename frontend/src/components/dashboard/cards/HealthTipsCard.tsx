import * as React from 'react';
import { useState } from 'react';

const HealthTipsCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
    { id: 'exercise', label: 'Exercise', icon: '💪' },
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'mental', label: 'Mental', icon: '🧠' }
  ];

  const tips = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain optimal body function.',
      icon: '💧',
      color: '#06b6d4'
    },
    {
      id: 2,
      category: 'exercise',
      title: 'Morning Stretches',
      description: 'Start your day with 10 minutes of stretching to improve flexibility.',
      icon: '🤸‍♀️',
      color: '#10b981'
    },
    {
      id: 3,
      category: 'sleep',
      title: 'Consistent Sleep Schedule',
      description: 'Go to bed and wake up at the same time every day for better sleep quality.',
      icon: '🌙',
      color: '#8b5cf6'
    },
    {
      id: 4,
      category: 'mental',
      title: 'Mindful Breathing',
      description: 'Practice 5 minutes of deep breathing exercises to reduce stress.',
      icon: '🧘‍♀️',
      color: '#f59e0b'
    },
    {
      id: 5,
      category: 'nutrition',
      title: 'Eat More Fiber',
      description: 'Include whole grains, fruits, and vegetables in your daily meals.',
      icon: '🥗',
      color: '#10b981'
    },
    {
      id: 6,
      category: 'exercise',
      title: 'Take the Stairs',
      description: 'Choose stairs over elevators to add more movement to your day.',
      icon: '🏃‍♂️',
      color: '#3b82f6'
    }
  ];

  const filteredTips = selectedCategory === 'all'
    ? tips
    : tips.filter(tip => tip.category === selectedCategory);

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-extrabold text-gray-800 m-0">
          Health Tips
        </h3>
        <button
          onClick={() => {
            // Optional: Add a shuffle or refresh animation logic here
          }}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors border border-primary-100 shadow-sm flex items-center gap-1"
        >
          <span>🔄</span> Refresh
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide relative z-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === category.id
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-white bg-opacity-60 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-100 shadow-sm'
              }`}
          >
            <span className="text-base">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="flex flex-col gap-3 overflow-y-auto pr-1 flex-grow relative z-10" style={{ maxHeight: '400px' }}>
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="flex items-start p-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-white border-opacity-40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow hover:bg-opacity-80 group/tip"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 flex-shrink-0 shadow-sm bg-opacity-20 transition-transform duration-300 group-hover/tip:scale-110"
              style={{ backgroundColor: `${tip.color}20`, color: tip.color }}
            >
              {tip.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 m-0 mb-1">
                {tip.title}
              </h4>
              <p className="text-xs text-gray-500 m-0 leading-relaxed font-medium">
                {tip.description}
              </p>
            </div>
            <button className="text-gray-300 hover:text-red-500 transition-colors ml-2 bg-transparent border-none cursor-pointer p-1 active:scale-90 text-lg">
              ❤️
            </button>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center p-8 text-gray-500 bg-gray-50 bg-opacity-50 rounded-xl border border-dashed border-gray-300">
          <p className="m-0 text-sm font-medium">No tips available for this category.</p>
        </div>
      )}
    </div>
  );
};

export default HealthTipsCard;