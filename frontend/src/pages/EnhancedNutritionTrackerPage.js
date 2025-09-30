import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, Upload, Trash2, Target } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import toast from 'react-hot-toast';
const EnhancedNutritionTrackerPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMeal, setSelectedMeal] = useState('breakfast');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [todayNutrition, setTodayNutrition] = useState({
        date: new Date().toISOString().split('T')[0],
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
        water: 0,
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalFiber: 0,
        goals: {
            calories: 2000,
            protein: 120,
            carbs: 250,
            fat: 65,
            fiber: 25,
            water: 2000
        },
        remaining: {
            calories: 2000,
            protein: 120,
            carbs: 250,
            fat: 65,
            fiber: 25,
            water: 2000
        },
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
    const handleImageUpload = async (file) => {
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
        }
        catch (error) {
            toast.error('Failed to analyze image. Please try again.');
            console.error('Analysis error:', error);
        }
        finally {
            setIsAnalyzing(false);
        }
    };
    const handleFoodSearch = async () => {
        if (!searchTerm.trim())
            return;
        setIsAnalyzing(true);
        try {
            const analysis = await geminiService.searchFoodInfo(searchTerm);
            setAnalysisResult(analysis);
            toast.success('Food information retrieved!');
        }
        catch (error) {
            toast.error('Failed to get food information. Please try again.');
            console.error('Search error:', error);
        }
        finally {
            setIsAnalyzing(false);
        }
    };
    const addFoodToMeal = (food) => {
        const newMeal = {
            id: Date.now().toString(),
            name: food.name,
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            fiber: food.fiber,
            quantity: food.servingSize,
            mealType: selectedMeal,
            timestamp: new Date(),
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
    const removeMeal = (mealId) => {
        const meal = todayNutrition.meals.find(m => m.id === mealId);
        if (!meal)
            return;
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
    const getProgressColor = (current, target) => {
        const percentage = (current / target) * 100;
        if (percentage >= 90 && percentage <= 110)
            return 'text-green-600';
        if (percentage >= 70 && percentage < 90)
            return 'text-yellow-600';
        if (percentage > 110)
            return 'text-orange-600';
        return 'text-red-600';
    };
    const getProgressBarColor = (current, target) => {
        const percentage = (current / target) * 100;
        if (percentage >= 90 && percentage <= 110)
            return 'bg-green-500';
        if (percentage >= 70 && percentage < 90)
            return 'bg-yellow-500';
        if (percentage > 110)
            return 'bg-orange-500';
        return 'bg-red-500';
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Enhanced Nutrition Tracker" }), _jsx("p", { className: "text-gray-600 mt-1", children: "AI-powered food logging with smart analysis" })] }), _jsxs("div", { className: "mt-4 sm:mt-0 flex items-center space-x-2", children: [_jsxs("div", { className: "text-sm text-gray-500", children: ["Today: ", _jsxs("span", { className: "font-semibold", children: [todayNutrition.calories, " / ", nutritionGoals.calories, " cal"] })] }), _jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                    { name: 'Calories', current: todayNutrition.calories, target: nutritionGoals.calories, color: 'red', icon: '🔥' },
                    { name: 'Protein', current: todayNutrition.protein, target: nutritionGoals.protein, color: 'blue', icon: '💪' },
                    { name: 'Carbs', current: todayNutrition.carbs, target: nutritionGoals.carbs, color: 'green', icon: '🌾' },
                    { name: 'Fat', current: todayNutrition.fat, target: nutritionGoals.fat, color: 'yellow', icon: '🥑' }
                ].map((macro, index) => (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-lg", children: macro.icon }) }), _jsxs("div", { className: `text-sm font-semibold ${getProgressColor(macro.current, macro.target)}`, children: [Math.round((macro.current / macro.target) * 100), "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: macro.name }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: macro.current }), _jsxs("p", { className: "text-sm text-gray-500", children: ["/ ", macro.target, "g goal"] })] }), _jsx("div", { className: "mt-3 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full ${getProgressBarColor(macro.current, macro.target)}`, style: { width: `${Math.min((macro.current / macro.target) * 100, 100)}%` } }) })] }, index))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Today's Meals" }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: mealTypes.map((meal) => {
                                            const mealData = todayNutrition.meals.filter(m => m.mealType === meal.id);
                                            const totalCalories = mealData.reduce((sum, m) => sum + m.calories, 0);
                                            return (_jsx("button", { onClick: () => setSelectedMeal(meal.id), className: `p-4 rounded-lg border-2 transition-all ${selectedMeal === meal.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl mb-2", children: meal.icon }), _jsx("div", { className: "text-sm font-medium text-gray-900", children: meal.name }), _jsx("div", { className: "text-xs text-gray-500 mt-1", children: meal.time }), _jsx("div", { className: "text-lg font-bold text-blue-600 mt-2", children: totalCalories }), _jsx("div", { className: "text-xs text-gray-500", children: "cal" })] }) }, meal.id));
                                        }) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Add Food" }), _jsx("div", { className: "mb-4", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search for food items...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleFoodSearch(), className: "w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" }), _jsx("button", { onClick: handleFoodSearch, disabled: isAnalyzing, className: "absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50", children: isAnalyzing ? 'Searching...' : 'Search' })] }) }), _jsx("div", { className: "mb-4", children: _jsxs("div", { className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center", children: [_jsx(Upload, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Upload food image for AI analysis" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => e.target.files?.[0] && handleImageUpload(e.target.files[0]), className: "hidden", id: "image-upload" }), _jsx("label", { htmlFor: "image-upload", className: "bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 cursor-pointer", children: "Choose Image" })] }) }), analysisResult && (_jsxs("div", { className: "bg-blue-50 rounded-lg p-4 mb-4", children: [_jsx("h4", { className: "font-semibold text-gray-900 mb-2", children: "Analysis Result" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Food:" }), _jsx("span", { className: "font-medium", children: analysisResult.name })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Calories:" }), _jsx("span", { className: "font-medium", children: analysisResult.calories })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Protein:" }), _jsxs("span", { className: "font-medium", children: [analysisResult.protein, "g"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Carbs:" }), _jsxs("span", { className: "font-medium", children: [analysisResult.carbs, "g"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Fat:" }), _jsxs("span", { className: "font-medium", children: [analysisResult.fat, "g"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Confidence:" }), _jsxs("span", { className: "font-medium", children: [analysisResult.confidence, "%"] })] })] }), _jsxs("button", { onClick: () => addFoodToMeal(analysisResult), className: "w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors", children: ["Add to ", selectedMeal] })] })), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Recent Foods" }), _jsx("div", { className: "space-y-2", children: recentFoods.map((food, index) => (_jsx("button", { onClick: () => {
                                                        const mockAnalysis = {
                                                            foodName: food.name,
                                                            name: food.name,
                                                            calories: food.calories,
                                                            protein: food.protein,
                                                            carbs: food.carbs,
                                                            fat: food.fat,
                                                            fiber: 3,
                                                            confidence: 95,
                                                            description: 'Food item',
                                                            servingSize: '1 serving'
                                                        };
                                                        addFoodToMeal(mockAnalysis);
                                                    }, className: "w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900", children: food.name }), _jsxs("div", { className: "text-sm text-gray-500", children: [food.protein, "g protein \u2022 ", food.carbs, "g carbs \u2022 ", food.fat, "g fat"] })] }), _jsxs("div", { className: "text-sm font-semibold text-gray-900", children: [food.calories, " cal"] })] }) }, index))) })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Today's Meals" }), _jsxs("div", { className: "space-y-3", children: [todayNutrition.meals.map((meal) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-gray-900", children: meal.name }), _jsxs("div", { className: "text-sm text-gray-500", children: [meal.protein, "g protein \u2022 ", meal.carbs, "g carbs \u2022 ", meal.fat, "g fat"] }), _jsx("div", { className: "text-xs text-gray-400 capitalize", children: meal.mealType })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "text-right", children: _jsxs("div", { className: "font-semibold text-gray-900", children: [meal.calories, " cal"] }) }), _jsx("button", { onClick: () => removeMeal(meal.id), className: "p-1 text-red-500 hover:bg-red-50 rounded", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })] }, meal.id))), todayNutrition.meals.length === 0 && (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(Target, { className: "w-12 h-12 mx-auto mb-4 text-gray-300" }), _jsx("p", { children: "No meals logged today" }), _jsx("p", { className: "text-sm", children: "Start by adding your first meal!" })] }))] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Stats" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Meals logged" }), _jsx("span", { className: "font-semibold", children: todayNutrition.meals.length })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Calorie goal" }), _jsx("span", { className: "font-semibold", children: nutritionGoals.calories })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Remaining" }), _jsx("span", { className: "font-semibold text-blue-600", children: nutritionGoals.calories - todayNutrition.calories })] })] })] })] })] })] }));
};
export default EnhancedNutritionTrackerPage;
