import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Camera, 
  Upload, 
  Edit3, 
  Trash2, 
  CheckCircle,
  AlertTriangle,
  Clock,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';
import { geminiService, FoodAnalysis } from '../services/geminiService';
import { nutritionService, MealEntry, DailyNutrition } from '../services/nutritionService';
import toast from 'react-hot-toast';

const EnhancedNutritionTrackerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysis | null>(null);
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

  const [nutritionGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25,
    water: 2.5
  });

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', time: '8:00 AM', icon: '🌅' },
    { id: 'lunch', name: 'Lunch', time: '1:00 PM', icon: '☀️' },
    { id: 'dinner', name: 'Dinner', time: '7:00 PM', icon: '🌙' },
    { id: 'snack', name: 'Snacks', time: '3:00 PM', icon: '🍎' }
  ];

  const recentFoods = [
    { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15 },
    { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0 },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 }
  ];

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    setIsAnalyzing(true);
    setUploadedImage(URL.createObjectURL(file));

    try {
      const analysis = await geminiService.analyzeFoodImage(file);
      setAnalysisResult(analysis);
      toast.success('Food analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze image. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFoodSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsAnalyzing(true);
    try {
      const analysis = await geminiService.searchFoodInfo(searchTerm);
      setAnalysisResult(analysis);
      toast.success('Food information retrieved!');
    } catch (error) {
      toast.error('Failed to get food information. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addFoodToMeal = (food: FoodAnalysis) => {
    const newMeal: MealEntry = {
      id: Date.now().toString(),
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      sugar: food.sugar,
      quantity: food.servingSize,
      mealType: selectedMeal,
      timestamp: new Date().toISOString(),
      imageUrl: uploadedImage || undefined
    };

    setTodayNutrition(prev => ({
      ...prev,
      calories: prev.calories + food.calories,
      protein: prev.protein + food.protein,
      carbs: prev.carbs + food.carbs,
      fat: prev.fat + food.fat,
      fiber: prev.fiber + (food.fiber || 0),
      meals: [...prev.meals, newMeal]
    }));

    setAnalysisResult(null);
    setUploadedImage(null);
    toast.success(`${food.name} added to ${selectedMeal}!`);
  };

  const removeMeal = (mealId: string) => {
    const meal = todayNutrition.meals.find(m => m.id === mealId);
    if (!meal) return;

    setTodayNutrition(prev => ({
      ...prev,
      calories: prev.calories - meal.calories,
      protein: prev.protein - meal.protein,
      carbs: prev.carbs - meal.carbs,
      fat: prev.fat - meal.fat,
      fiber: prev.fiber - (meal.fiber || 0),
      meals: prev.meals.filter(m => m.id !== mealId)
    }));

    toast.success('Meal removed successfully');
  };

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Nutrition Tracker</h1>
          <p className="text-gray-600 mt-1">AI-powered food logging with smart analysis</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            Today: <span className="font-semibold">{todayNutrition.calories} / {nutritionGoals.calories} cal</span>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Nutrition Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'Calories', current: todayNutrition.calories, target: nutritionGoals.calories, color: 'red', icon: '🔥' },
          { name: 'Protein', current: todayNutrition.protein, target: nutritionGoals.protein, color: 'blue', icon: '💪' },
          { name: 'Carbs', current: todayNutrition.carbs, target: nutritionGoals.carbs, color: 'green', icon: '🌾' },
          { name: 'Fat', current: todayNutrition.fat, target: nutritionGoals.fat, color: 'yellow', icon: '🥑' }
        ].map((macro, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">{macro.icon}</span>
              </div>
              <div className={`text-sm font-semibold ${getProgressColor(macro.current, macro.target)}`}>
                {Math.round((macro.current / macro.target) * 100)}%
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">{macro.name}</p>
              <p className="text-2xl font-bold text-gray-900">{macro.current}</p>
              <p className="text-sm text-gray-500">/ {macro.target}g goal</p>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getProgressBarColor(macro.current, macro.target)}`}
                style={{ width: `${Math.min((macro.current / macro.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meal Selection & Logging */}
        <div className="lg:col-span-2 space-y-6">
          {/* Meal Types */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Meals</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {mealTypes.map((meal) => {
                const mealData = todayNutrition.meals.filter(m => m.mealType === meal.id);
                const totalCalories = mealData.reduce((sum, m) => sum + m.calories, 0);
                
                return (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedMeal === meal.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{meal.icon}</div>
                      <div className="text-sm font-medium text-gray-900">{meal.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{meal.time}</div>
                      <div className="text-lg font-bold text-blue-600 mt-2">{totalCalories}</div>
                      <div className="text-xs text-gray-500">cal</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Food Search & Upload */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Food</h3>
            
            {/* Search Input */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for food items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleFoodSearch()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleFoodSearch}
                  disabled={isAnalyzing}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  {isAnalyzing ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload food image for AI analysis</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 cursor-pointer"
                >
                  Choose Image
                </label>
              </div>
            </div>

            {/* Analysis Result */}
            {analysisResult && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Analysis Result</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Food:</span>
                    <span className="font-medium">{analysisResult.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Calories:</span>
                    <span className="font-medium">{analysisResult.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Protein:</span>
                    <span className="font-medium">{analysisResult.protein}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Carbs:</span>
                    <span className="font-medium">{analysisResult.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fat:</span>
                    <span className="font-medium">{analysisResult.fat}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Confidence:</span>
                    <span className="font-medium">{analysisResult.confidence}%</span>
                  </div>
                </div>
                <button
                  onClick={() => addFoodToMeal(analysisResult)}
                  className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add to {selectedMeal}
                </button>
              </div>
            )}

            {/* Recent Foods */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recent Foods</h4>
              <div className="space-y-2">
                {recentFoods.map((food, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const mockAnalysis: FoodAnalysis = {
                        name: food.name,
                        calories: food.calories,
                        protein: food.protein,
                        carbs: food.carbs,
                        fat: food.fat,
                        confidence: 95,
                        servingSize: '1 serving'
                      };
                      addFoodToMeal(mockAnalysis);
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{food.name}</div>
                        <div className="text-sm text-gray-500">
                          {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{food.calories} cal</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Meals List */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Meals</h3>
            <div className="space-y-3">
              {todayNutrition.meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{meal.name}</div>
                    <div className="text-sm text-gray-500">
                      {meal.protein}g protein • {meal.carbs}g carbs • {meal.fat}g fat
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{meal.mealType}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{meal.calories} cal</div>
                    </div>
                    <button
                      onClick={() => removeMeal(meal.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {todayNutrition.meals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No meals logged today</p>
                  <p className="text-sm">Start by adding your first meal!</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Meals logged</span>
                <span className="font-semibold">{todayNutrition.meals.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Calorie goal</span>
                <span className="font-semibold">{nutritionGoals.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Remaining</span>
                <span className="font-semibold text-blue-600">
                  {nutritionGoals.calories - todayNutrition.calories}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNutritionTrackerPage;
