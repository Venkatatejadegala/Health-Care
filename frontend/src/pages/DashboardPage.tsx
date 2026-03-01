import * as React from 'react';
import HealthMetricsCard from '../components/dashboard/cards/HealthMetricsCard';
import GoalTrackerCard from '../components/dashboard/cards/GoalTrackerCard';
import AIRecommendationsCard from '../components/dashboard/cards/AIRecommendationsCard';
import HealthInsightsCard from '../components/dashboard/cards/HealthInsightsCard';
import RecentActivityCard from '../components/dashboard/cards/RecentActivityCard';
import HealthTipsCard from '../components/dashboard/cards/HealthTipsCard';
import NutritionTrackerCard from '../components/dashboard/cards/NutritionTrackerCard';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 tracking-tight">
              Health Dashboard
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Welcome back! Here is your daily summary.</p>
          </div>
        </header>

        {/* Main Dashboard Layout - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Metrics */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HealthMetricsCard />
              <GoalTrackerCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentActivityCard />
              <HealthTipsCard />
            </div>
          </div>

          {/* Right Column - AI Recommendations */}
          <div className="flex flex-col gap-6 sticky top-24">
            <AIRecommendationsCard />
            <HealthInsightsCard />
          </div>
        </div>

        {/* Bottom Row - Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="glass-panel p-6 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="text-4xl mb-3 animate-bounce-slow">👟</div>
            <h4 className="text-gray-700 text-sm font-semibold mb-1 uppercase tracking-wider">
              Steps Today
            </h4>
            <p className="text-3xl font-extrabold text-primary-600 m-0">
              8,432
            </p>
          </div>

          <div className="glass-panel p-6 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="text-4xl mb-3 animate-bounce-slow" style={{ animationDelay: '0.2s' }}>🔥</div>
            <h4 className="text-gray-700 text-sm font-semibold mb-1 uppercase tracking-wider">
              Calories Burned
            </h4>
            <p className="text-3xl font-extrabold text-red-500 m-0">
              1,247
            </p>
          </div>

          <div className="glass-panel p-6 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="text-4xl mb-3 animate-bounce-slow" style={{ animationDelay: '0.4s' }}>💧</div>
            <h4 className="text-gray-700 text-sm font-semibold mb-1 uppercase tracking-wider">
              Water Intake
            </h4>
            <p className="text-3xl font-extrabold text-cyan-500 m-0">
              6.2L
            </p>
          </div>

          <div className="glass-panel p-6 text-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="text-4xl mb-3 animate-bounce-slow" style={{ animationDelay: '0.6s' }}>🎯</div>
            <h4 className="text-gray-700 text-sm font-semibold mb-1 uppercase tracking-wider">
              Weekly Goal
            </h4>
            <p className="text-3xl font-extrabold text-emerald-500 m-0">
              75%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
