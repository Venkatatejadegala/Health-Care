'use client';

import React from 'react';
import { 
  Activity, 
  Clock, 
  TrendingUp, 
  Heart, 
  Droplets, 
  Zap,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react';

const RecentActivityCard: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'workout',
      title: 'Morning Run',
      description: 'Completed 5K run in 28 minutes',
      time: '2 hours ago',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      value: '5.2 km'
    },
    {
      id: 2,
      type: 'meal',
      title: 'Breakfast Logged',
      description: 'Oatmeal with berries and protein',
      time: '4 hours ago',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      value: '420 cal'
    },
    {
      id: 3,
      type: 'water',
      title: 'Water Intake',
      description: 'Drank 500ml of water',
      time: '6 hours ago',
      icon: Droplets,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      value: '500ml'
    },
    {
      id: 4,
      type: 'sleep',
      title: 'Sleep Logged',
      description: '7.5 hours of quality sleep',
      time: 'Yesterday',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      value: '7.5h'
    },
    {
      id: 5,
      type: 'goal',
      title: 'Goal Achieved',
      description: 'Daily step goal completed',
      time: 'Yesterday',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      value: '10,000'
    }
  ];

  const getActivityIcon = (type: string) => {
    const activity = activities.find(a => a.type === type);
    return activity?.icon || Activity;
  };

  const getActivityColor = (type: string) => {
    const activity = activities.find(a => a.type === type);
    return activity?.color || 'text-gray-600';
  };

  const getActivityBgColor = (type: string) => {
    const activity = activities.find(a => a.type === type);
    return activity?.bgColor || 'bg-gray-50';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 activity-gradient rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your latest health activities</p>
          </div>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {activity.description}
                </p>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {activity.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 inline mr-1" />
            View all activities
          </div>
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            See more →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
