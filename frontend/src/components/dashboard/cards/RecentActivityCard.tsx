import * as React from 'react';

const RecentActivityCard: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'exercise',
      title: 'Morning Run Completed',
      description: '5.2 km in 28 minutes',
      time: '2 hours ago',
      icon: '🏃‍♂️',
      color: '#3b82f6'
    },
    {
      id: 2,
      type: 'meal',
      title: 'Meal Logged',
      description: 'Grilled chicken salad',
      time: '4 hours ago',
      icon: '🍽️',
      color: '#10b981'
    },
    {
      id: 3,
      type: 'water',
      title: 'Water Intake Goal',
      description: '8 glasses completed',
      time: '6 hours ago',
      icon: '💧',
      color: '#06b6d4'
    },
    {
      id: 4,
      type: 'sleep',
      title: 'Sleep Recorded',
      description: '7.5 hours of quality sleep',
      time: 'Yesterday',
      icon: '😴',
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-extrabold text-gray-800 m-0">
          Recent Activity
        </h3>
        <button
          className="text-sm font-semibold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors border border-primary-100 shadow-sm"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-3 relative z-10">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center p-3 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-white border-opacity-40 transition-all duration-300 cursor-pointer shadow-sm hover:shadow hover:bg-opacity-80 group/item"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3 flex-shrink-0 shadow-sm bg-opacity-20 transition-transform duration-300 group-hover/item:scale-110"
              style={{ backgroundColor: `${activity.color}20`, color: activity.color }}
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 m-0 mb-0.5 truncate">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 m-0 truncate font-medium">
                {activity.description}
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-400 flex-shrink-0 ml-2 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;