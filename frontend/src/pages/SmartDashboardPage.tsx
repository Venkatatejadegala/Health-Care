import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Droplets, 
  Zap, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Flame
} from 'lucide-react';
import { nutritionService, UserProfile, NutritionGoals, DailyNutrition } from '../services/nutritionService';

const SmartDashboardPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 25,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'recomposition',
    dietaryRestrictions: []
  });

  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
  const [todayNutrition, setTodayNutrition] = useState<DailyNutrition>({
    date: new Date().toISOString().split('T')[0],
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    water: 0,
    meals: []
  });

  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    // Calculate nutrition goals when profile changes
    const goals = nutritionService.calculateNutritionGoals(userProfile);
    setNutritionGoals(goals);
    
    // Generate sample weekly data
    generateSampleData(goals);
  }, [userProfile]);

  const generateSampleData = (goals: NutritionGoals) => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate realistic daily variations
      const variation = 0.8 + Math.random() * 0.4; // 80-120% of goals
      data.push({
        date: dateStr,
        calories: Math.round(goals.calories * variation),
        protein: Math.round(goals.protein * variation),
        carbs: Math.round(goals.carbs * variation),
        fat: Math.round(goals.fat * variation),
        water: Math.round(goals.water * variation * 10) / 10,
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    setWeeklyData(data);
  };

  const macroData = nutritionGoals ? [
    { name: 'Protein', value: todayNutrition.protein, goal: nutritionGoals.protein, color: '#3B82F6' },
    { name: 'Carbs', value: todayNutrition.carbs, goal: nutritionGoals.carbs, color: '#10B981' },
    { name: 'Fat', value: todayNutrition.fat, goal: nutritionGoals.fat, color: '#F59E0B' }
  ] : [];

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

  if (!nutritionGoals) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Dashboard</h1>
          <p className="text-gray-600 mt-1">Your personalized health analytics hub</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            Goal: <span className="font-semibold capitalize">{userProfile.goal}</span>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Calories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-red-600" />
            </div>
            <div className={`text-sm font-semibold ${getProgressColor(todayNutrition.calories, nutritionGoals.calories)}`}>
              {Math.round((todayNutrition.calories / nutritionGoals.calories) * 100)}%
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Calories</p>
            <p className="text-2xl font-bold text-gray-900">{todayNutrition.calories}</p>
            <p className="text-sm text-gray-500">/ {nutritionGoals.calories} goal</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressBarColor(todayNutrition.calories, nutritionGoals.calories)}`}
              style={{ width: `${Math.min((todayNutrition.calories / nutritionGoals.calories) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Protein */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div className={`text-sm font-semibold ${getProgressColor(todayNutrition.protein, nutritionGoals.protein)}`}>
              {Math.round((todayNutrition.protein / nutritionGoals.protein) * 100)}%
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-2xl font-bold text-gray-900">{todayNutrition.protein}g</p>
            <p className="text-sm text-gray-500">/ {nutritionGoals.protein}g goal</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min((todayNutrition.protein / nutritionGoals.protein) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Water */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-cyan-600" />
            </div>
            <div className={`text-sm font-semibold ${getProgressColor(todayNutrition.water, nutritionGoals.water)}`}>
              {Math.round((todayNutrition.water / nutritionGoals.water) * 100)}%
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Water</p>
            <p className="text-2xl font-bold text-gray-900">{todayNutrition.water}L</p>
            <p className="text-sm text-gray-500">/ {nutritionGoals.water}L goal</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-cyan-500 h-2 rounded-full"
              style={{ width: `${Math.min((todayNutrition.water / nutritionGoals.water) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Activity Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm font-semibold text-green-600">85%</div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Activity Score</p>
            <p className="text-2xl font-bold text-gray-900">8,432</p>
            <p className="text-sm text-gray-500">steps today</p>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calorie Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Calorie Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="goal" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Macro Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Breakdown</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {macroData.map((macro, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: macro.color }}
                  />
                  <span className="text-sm text-gray-600">{macro.name}</span>
                </div>
                <span className="text-sm font-semibold">{macro.value}g / {macro.goal}g</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Water Intake & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Intake Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Intake Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="water" 
                stroke="#06B6D4" 
                fill="#06B6D4" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Macro Progress Bars */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Macro Progress</h3>
          <div className="space-y-4">
            {macroData.map((macro, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{macro.name}</span>
                  <span className="text-sm text-gray-600">
                    {macro.value}g / {macro.goal}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${Math.min((macro.value / macro.goal) * 100, 100)}%`,
                      backgroundColor: macro.color
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((macro.value / macro.goal) * 100)}% of daily goal
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Great protein intake!</p>
                <p className="text-xs text-green-700">You're meeting your muscle-building needs.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Water intake low</p>
                <p className="text-xs text-yellow-700">Drink 2 more glasses to reach your goal.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Meal timing</p>
                <p className="text-xs text-blue-700">Consider having dinner before 8 PM.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Log Meal</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Droplets className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Add Water</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Activity className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Log Exercise</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <Target className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-900">Update Goals</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDashboardPage;
