'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Utensils, Plus, Droplets, Flame, Zap, Apple, BarChart3 } from 'lucide-react';
const NutritionTrackerCard = () => {
    const [selectedMeal, setSelectedMeal] = useState('breakfast');
    const meals = [
        { id: 'breakfast', name: 'Breakfast', time: '8:00 AM', calories: 420, icon: '🌅' },
        { id: 'lunch', name: 'Lunch', time: '1:00 PM', calories: 580, icon: '☀️' },
        { id: 'dinner', name: 'Dinner', time: '7:00 PM', calories: 650, icon: '🌙' },
        { id: 'snacks', name: 'Snacks', time: '3:00 PM', calories: 150, icon: '🍎' }
    ];
    const nutritionGoals = {
        calories: { target: 2000, current: 1800, remaining: 200 },
        protein: { target: 150, current: 120, remaining: 30 },
        carbs: { target: 250, current: 180, remaining: 70 },
        fat: { target: 65, current: 45, remaining: 20 }
    };
    const recentFoods = [
        { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8 },
        { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15 },
        { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0 }
    ];
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
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 nutrition-gradient rounded-lg flex items-center justify-center", children: _jsx(Utensils, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Nutrition Tracker" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Track your daily nutrition goals" })] })] }), _jsxs("button", { className: "flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Add Food" })] })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: Object.entries(nutritionGoals).map(([nutrient, data]) => (_jsxs("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-sm font-medium text-gray-600 dark:text-gray-400 capitalize", children: nutrient }), _jsxs("div", { className: `text-sm font-semibold ${getProgressColor(data.current, data.target)}`, children: [Math.round((data.current / data.target) * 100), "%"] })] }), _jsx("div", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-1", children: data.current }), _jsxs("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: ["/ ", data.target, "g goal"] }), _jsx("div", { className: "mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full ${getProgressBarColor(data.current, data.target)}`, style: { width: `${Math.min((data.current / data.target) * 100, 100)}%` } }) })] }, nutrient))) }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Today's Meals" }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: meals.map((meal) => (_jsx("button", { onClick: () => setSelectedMeal(meal.id), className: `p-4 rounded-lg border-2 transition-all ${selectedMeal === meal.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl mb-2", children: meal.icon }), _jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: meal.name }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: meal.time }), _jsx("div", { className: "text-lg font-bold text-blue-600 dark:text-blue-400 mt-2", children: meal.calories }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "cal" })] }) }, meal.id))) })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Recent Foods" }), _jsx("div", { className: "space-y-3", children: recentFoods.map((food, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center", children: _jsx(Apple, { className: "w-4 h-4 text-green-600 dark:text-green-400" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900 dark:text-white", children: food.name }), _jsxs("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: [food.protein, "g protein \u2022 ", food.carbs, "g carbs \u2022 ", food.fat, "g fat"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-semibold text-gray-900 dark:text-white", children: [food.calories, " cal"] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm", children: "Add" })] })] }, index))) })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx(Flame, { className: "w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "1,800" }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Calories" })] }), _jsxs("div", { className: "text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsx(Zap, { className: "w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "120g" }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Protein" })] }), _jsxs("div", { className: "text-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg", children: [_jsx(Droplets, { className: "w-6 h-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "6.2L" }), _jsx("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Water" })] })] }), _jsx("div", { className: "pt-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [_jsx(BarChart3, { className: "w-4 h-4 inline mr-1" }), "Track your nutrition progress"] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors", children: "View details \u2192" })] }) })] }));
};
export default NutritionTrackerCard;
