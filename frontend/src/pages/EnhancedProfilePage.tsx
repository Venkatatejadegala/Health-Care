import React, { useState, useEffect } from 'react';
import { 
  User, 
  Target, 
  Calculator, 
  Activity, 
  Save, 
  Edit3, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Zap,
  Droplets,
  Flame
} from 'lucide-react';
import { nutritionService, UserProfile, NutritionGoals } from '../services/nutritionService';
import toast from 'react-hot-toast';

const EnhancedProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 25,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'recomposition',
    goals: ['recomposition'],
    dietaryRestrictions: []
  });

  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals | null>(null);
  const [bmr, setBmr] = useState<number>(0);
  const [tdee, setTdee] = useState<number>(0);

  useEffect(() => {
    calculateMetrics();
  }, [userProfile]);

  const calculateMetrics = () => {
    const calculatedBmr = nutritionService.calculateBMR(userProfile);
    const calculatedTdee = nutritionService.calculateTDEE(userProfile);
    const goals = nutritionService.calculateNutritionGoals(userProfile);
    
    setBmr(calculatedBmr);
    setTdee(calculatedTdee);
    setNutritionGoals(goals);
  };

  const handleSave = () => {
    calculateMetrics();
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
    { value: 'light', label: 'Light', description: 'Light exercise 1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: 'Moderate exercise 3-5 days/week' },
    { value: 'active', label: 'Active', description: 'Heavy exercise 6-7 days/week' },
    { value: 'very_active', label: 'Very Active', description: 'Very heavy exercise, physical job' }
  ];

  const goals = [
    { value: 'cutting', label: 'Cutting', description: 'Lose weight, reduce body fat', color: 'red' },
    { value: 'bulking', label: 'Bulking', description: 'Gain weight, build muscle', color: 'green' },
    { value: 'recomposition', label: 'Recomposition', description: 'Maintain weight, change body composition', color: 'blue' }
  ];

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Keto',
    'Paleo',
    'Mediterranean',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Low-Carb',
    'High-Protein'
  ];

  const getGoalColor = (goal: string) => {
    const goalData = goals.find(g => g.value === goal);
    return goalData?.color || 'gray';
  };

  const getActivityMultiplier = (level: string) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    return multipliers[level as keyof typeof multipliers];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile & Goals</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and health goals</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{userProfile.age} years</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    value={userProfile.weight}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{userProfile.weight} kg</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={userProfile.height}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{userProfile.height} cm</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                {isEditing ? (
                  <select
                    value={userProfile.gender}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <p className="text-lg font-semibold text-gray-900 capitalize">{userProfile.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Level</h2>
            <div className="space-y-3">
              {activityLevels.map((level) => (
                <label
                  key={level.value}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    userProfile.activityLevel === level.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={level.value}
                    checked={userProfile.activityLevel === level.value}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, activityLevel: e.target.value as any }))}
                    className="sr-only"
                    disabled={!isEditing}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {getActivityMultiplier(level.value)}x
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Fitness Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <label
                  key={goal.value}
                  className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    userProfile.goal === goal.value
                      ? `border-${goal.color}-500 bg-${goal.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={goal.value}
                    checked={userProfile.goal === goal.value}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, goal: e.target.value as any }))}
                    className="sr-only"
                    disabled={!isEditing}
                  />
                  <div className="text-center">
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-${goal.color}-100 flex items-center justify-center`}>
                      <Target className={`w-4 h-4 text-${goal.color}-600`} />
                    </div>
                    <div className="font-medium text-gray-900">{goal.label}</div>
                    <div className="text-sm text-gray-600">{goal.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dietary Preferences</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    userProfile.dietaryRestrictions?.includes(option)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={userProfile.dietaryRestrictions?.includes(option) || false}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setUserProfile(prev => ({
                          ...prev,
                          dietaryRestrictions: [...(prev.dietaryRestrictions || []), option]
                        }));
                      } else {
                        setUserProfile(prev => ({
                          ...prev,
                          dietaryRestrictions: (prev.dietaryRestrictions || []).filter(item => item !== option)
                        }));
                      }
                    }}
                    className="sr-only"
                    disabled={!isEditing}
                  />
                  <span className="text-sm font-medium text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        {/* Metrics & Goals */}
        <div className="space-y-6">
          {/* BMR & TDEE */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metabolic Metrics</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{Math.round(bmr)}</div>
                <div className="text-sm text-gray-600">BMR (calories/day)</div>
                <div className="text-xs text-gray-500">Basal Metabolic Rate</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{Math.round(tdee)}</div>
                <div className="text-sm text-gray-600">TDEE (calories/day)</div>
                <div className="text-xs text-gray-500">Total Daily Energy Expenditure</div>
              </div>
            </div>
          </div>

          {/* Nutrition Goals */}
          {nutritionGoals && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Nutrition Goals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-600">Calories</span>
                  </div>
                  <span className="font-semibold">{nutritionGoals.calories}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Protein</span>
                  </div>
                  <span className="font-semibold">{nutritionGoals.protein}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Carbs</span>
                  </div>
                  <span className="font-semibold">{nutritionGoals.carbs}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Fat</span>
                  </div>
                  <span className="font-semibold">{nutritionGoals.fat}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm text-gray-600">Water</span>
                  </div>
                  <span className="font-semibold">{nutritionGoals.water}L</span>
                </div>
              </div>
            </div>
          )}

          {/* Goal Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Insights</h3>
            <div className="space-y-3">
              {userProfile.goal === 'cutting' && (
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Cutting Phase</p>
                    <p className="text-xs text-red-700">Maintain a 300-500 calorie deficit daily for optimal fat loss.</p>
                  </div>
                </div>
              )}
              
              {userProfile.goal === 'bulking' && (
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Bulking Phase</p>
                    <p className="text-xs text-green-700">Aim for a 200-400 calorie surplus to support muscle growth.</p>
                  </div>
                </div>
              )}
              
              {userProfile.goal === 'recomposition' && (
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Recomposition</p>
                    <p className="text-xs text-blue-700">Focus on strength training and adequate protein intake.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfilePage;
