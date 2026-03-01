import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Heart,
  Target,
  Calendar,
  BarChart3,
  Zap
} from 'lucide-react';
import RecentActivityCard from '../components/dashboard/cards/RecentActivityCard';
import ApiKeyManagementCard from '../../components/dashboard/cards/ApiKeyManagementCard';
import HealthTipsCard from '../components/dashboard/cards/HealthTipsCard';
import NutritionTrackerCard from '../components/dashboard/cards/NutritionTrackerCard';

const SimpleDashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Steps',
      value: '8,432',
      change: '+12%',
      changeType: 'positive',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Calories Burned',
      value: '1,247',
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Water Intake',
      value: '6.2L',
      change: '+15%',
      changeType: 'positive',
      icon: Heart,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Sleep Quality',
      value: '85%',
      change: '+5%',
      changeType: 'positive',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Health Dashboard!</h1>
              <p className="text-gray-600 text-lg">Your modern health tracking application</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <RecentActivityCard />
            <ApiKeyManagementCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <HealthTipsCard />
            <NutritionTrackerCard />
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Weekly Goal</h3>
                <p className="text-sm text-gray-500">Progress tracking</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">75%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">5 of 7 days completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
                <p className="text-sm text-gray-500">Overall wellness</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">8.5/10</div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-green-500 rounded-full" />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-200 rounded-full" />
                ))}
              </div>
              <span className="text-sm text-gray-600">Excellent</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Streak</h3>
                <p className="text-sm text-gray-500">Days in a row</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
            <p className="text-sm text-gray-600">Keep it up! 🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboardPage;
