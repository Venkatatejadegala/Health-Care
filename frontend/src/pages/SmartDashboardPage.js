import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Target, Droplets, Zap, Activity, AlertTriangle, CheckCircle, Clock, Flame } from 'lucide-react';
import { nutritionService } from '../services/nutritionService';
const SmartDashboardPage = () => {
    const [userProfile, setUserProfile] = useState({
        age: 25,
        weight: 70,
        height: 175,
        gender: 'male',
        activityLevel: 'moderate',
        goal: 'recomposition',
        goals: ['recomposition'],
        dietaryRestrictions: []
    });
    const [nutritionGoals, setNutritionGoals] = useState(null);
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
    const [weeklyData, setWeeklyData] = useState([]);
    useEffect(() => {
        // Calculate nutrition goals when profile changes
        const goals = nutritionService.calculateNutritionGoals(userProfile);
        setNutritionGoals(goals);
        // Generate sample weekly data
        generateSampleData(goals);
    }, [userProfile]);
    const generateSampleData = (goals) => {
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
    if (!nutritionGoals)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Smart Dashboard" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Your personalized health analytics hub" })] }), _jsxs("div", { className: "mt-4 sm:mt-0 flex items-center space-x-2", children: [_jsxs("div", { className: "text-sm text-gray-500", children: ["Goal: ", _jsx("span", { className: "font-semibold capitalize", children: userProfile.goal })] }), _jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center", children: _jsx(Flame, { className: "w-5 h-5 text-red-600" }) }), _jsxs("div", { className: `text-sm font-semibold ${getProgressColor(todayNutrition.calories, nutritionGoals.calories)}`, children: [Math.round((todayNutrition.calories / nutritionGoals.calories) * 100), "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Calories" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: todayNutrition.calories }), _jsxs("p", { className: "text-sm text-gray-500", children: ["/ ", nutritionGoals.calories, " goal"] })] }), _jsx("div", { className: "mt-3 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full ${getProgressBarColor(todayNutrition.calories, nutritionGoals.calories)}`, style: { width: `${Math.min((todayNutrition.calories / nutritionGoals.calories) * 100, 100)}%` } }) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center", children: _jsx(Target, { className: "w-5 h-5 text-blue-600" }) }), _jsxs("div", { className: `text-sm font-semibold ${getProgressColor(todayNutrition.protein, nutritionGoals.protein)}`, children: [Math.round((todayNutrition.protein / nutritionGoals.protein) * 100), "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Protein" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [todayNutrition.protein, "g"] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["/ ", nutritionGoals.protein, "g goal"] })] }), _jsx("div", { className: "mt-3 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: `${Math.min((todayNutrition.protein / nutritionGoals.protein) * 100, 100)}%` } }) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center", children: _jsx(Droplets, { className: "w-5 h-5 text-cyan-600" }) }), _jsxs("div", { className: `text-sm font-semibold ${getProgressColor(todayNutrition.water, nutritionGoals.water)}`, children: [Math.round((todayNutrition.water / nutritionGoals.water) * 100), "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Water" }), _jsxs("p", { className: "text-2xl font-bold text-gray-900", children: [todayNutrition.water, "L"] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["/ ", nutritionGoals.water, "L goal"] })] }), _jsx("div", { className: "mt-3 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-cyan-500 h-2 rounded-full", style: { width: `${Math.min((todayNutrition.water / nutritionGoals.water) * 100, 100)}%` } }) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center", children: _jsx(Activity, { className: "w-5 h-5 text-green-600" }) }), _jsx("div", { className: "text-sm font-semibold text-green-600", children: "85%" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600", children: "Activity Score" }), _jsx("p", { className: "text-2xl font-bold text-gray-900", children: "8,432" }), _jsx("p", { className: "text-sm text-gray-500", children: "steps today" })] }), _jsx("div", { className: "mt-3 w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full", style: { width: '85%' } }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Weekly Calorie Trend" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: weeklyData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "day" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "calories", stroke: "#3B82F6", strokeWidth: 3, dot: { fill: '#3B82F6', strokeWidth: 2, r: 4 } }), _jsx(Line, { type: "monotone", dataKey: "goal", stroke: "#10B981", strokeWidth: 2, strokeDasharray: "5 5", dot: false })] }) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Macro Breakdown" }), _jsx("div", { className: "flex items-center justify-center", children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: macroData, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 100, paddingAngle: 5, dataKey: "value", children: macroData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) }), _jsx("div", { className: "mt-4 space-y-2", children: macroData.map((macro, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: macro.color } }), _jsx("span", { className: "text-sm text-gray-600", children: macro.name })] }), _jsxs("span", { className: "text-sm font-semibold", children: [macro.value, "g / ", macro.goal, "g"] })] }, index))) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Water Intake Trend" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(AreaChart, { data: weeklyData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "day" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Area, { type: "monotone", dataKey: "water", stroke: "#06B6D4", fill: "#06B6D4", fillOpacity: 0.3 })] }) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Macro Progress" }), _jsx("div", { className: "space-y-4", children: macroData.map((macro, index) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: macro.name }), _jsxs("span", { className: "text-sm text-gray-600", children: [macro.value, "g / ", macro.goal, "g"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "h-2 rounded-full", style: {
                                                    width: `${Math.min((macro.value / macro.goal) * 100, 100)}%`,
                                                    backgroundColor: macro.color
                                                } }) }), _jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [Math.round((macro.value / macro.goal) * 100), "% of daily goal"] })] }, index))) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Today's Insights" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start space-x-3 p-3 bg-green-50 rounded-lg", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-green-900", children: "Great protein intake!" }), _jsx("p", { className: "text-xs text-green-700", children: "You're meeting your muscle-building needs." })] })] }), _jsxs("div", { className: "flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-yellow-900", children: "Water intake low" }), _jsx("p", { className: "text-xs text-yellow-700", children: "Drink 2 more glasses to reach your goal." })] })] }), _jsxs("div", { className: "flex items-start space-x-3 p-3 bg-blue-50 rounded-lg", children: [_jsx(Clock, { className: "w-5 h-5 text-blue-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-blue-900", children: "Meal timing" }), _jsx("p", { className: "text-xs text-blue-700", children: "Consider having dinner before 8 PM." })] })] })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("button", { className: "w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors", children: [_jsx(Zap, { className: "w-5 h-5 text-blue-600" }), _jsx("span", { className: "font-medium text-blue-900", children: "Log Meal" })] }), _jsxs("button", { className: "w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors", children: [_jsx(Droplets, { className: "w-5 h-5 text-green-600" }), _jsx("span", { className: "font-medium text-green-900", children: "Add Water" })] }), _jsxs("button", { className: "w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors", children: [_jsx(Activity, { className: "w-5 h-5 text-purple-600" }), _jsx("span", { className: "font-medium text-purple-900", children: "Log Exercise" })] }), _jsxs("button", { className: "w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors", children: [_jsx(Target, { className: "w-5 h-5 text-orange-600" }), _jsx("span", { className: "font-medium text-orange-900", children: "Update Goals" })] })] })] })] })] }));
};
export default SmartDashboardPage;
