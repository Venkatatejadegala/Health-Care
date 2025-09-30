import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Target, Calculator, Activity, Save, Edit3, CheckCircle, AlertTriangle, TrendingUp, Zap, Droplets, Flame } from 'lucide-react';
import { nutritionService } from '../services/nutritionService';
import toast from 'react-hot-toast';
const EnhancedProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
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
    const [bmr, setBmr] = useState(0);
    const [tdee, setTdee] = useState(0);
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
    const getGoalColor = (goal) => {
        const goalData = goals.find(g => g.value === goal);
        return goalData?.color || 'gray';
    };
    const getActivityMultiplier = (level) => {
        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9
        };
        return multipliers[level];
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Profile & Goals" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Manage your personal information and health goals" })] }), _jsxs("button", { onClick: () => setIsEditing(!isEditing), className: "mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors", children: [_jsx(Edit3, { className: "w-4 h-4" }), _jsx("span", { children: isEditing ? 'Cancel' : 'Edit Profile' })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Personal Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Age" }), isEditing ? (_jsx("input", { type: "number", value: userProfile.age, onChange: (e) => setUserProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })) : (_jsxs("p", { className: "text-lg font-semibold text-gray-900", children: [userProfile.age, " years"] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Weight (kg)" }), isEditing ? (_jsx("input", { type: "number", step: "0.1", value: userProfile.weight, onChange: (e) => setUserProfile(prev => ({ ...prev, weight: parseFloat(e.target.value) || 0 })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })) : (_jsxs("p", { className: "text-lg font-semibold text-gray-900", children: [userProfile.weight, " kg"] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Height (cm)" }), isEditing ? (_jsx("input", { type: "number", value: userProfile.height, onChange: (e) => setUserProfile(prev => ({ ...prev, height: parseInt(e.target.value) || 0 })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" })) : (_jsxs("p", { className: "text-lg font-semibold text-gray-900", children: [userProfile.height, " cm"] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Gender" }), isEditing ? (_jsxs("select", { value: userProfile.gender, onChange: (e) => setUserProfile(prev => ({ ...prev, gender: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent", children: [_jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" })] })) : (_jsx("p", { className: "text-lg font-semibold text-gray-900 capitalize", children: userProfile.gender }))] })] })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Activity Level" }), _jsx("div", { className: "space-y-3", children: activityLevels.map((level) => (_jsxs("label", { className: `flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${userProfile.activityLevel === level.value
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx("input", { type: "radio", name: "activityLevel", value: level.value, checked: userProfile.activityLevel === level.value, onChange: (e) => setUserProfile(prev => ({ ...prev, activityLevel: e.target.value })), className: "sr-only", disabled: !isEditing }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-gray-900", children: level.label }), _jsx("div", { className: "text-sm text-gray-600", children: level.description })] }), _jsxs("div", { className: "text-sm text-gray-500", children: [getActivityMultiplier(level.value), "x"] })] }, level.value))) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Fitness Goals" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: goals.map((goal) => (_jsxs("label", { className: `flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-colors ${userProfile.goal === goal.value
                                                ? `border-${goal.color}-500 bg-${goal.color}-50`
                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx("input", { type: "radio", name: "goal", value: goal.value, checked: userProfile.goal === goal.value, onChange: (e) => setUserProfile(prev => ({ ...prev, goal: e.target.value })), className: "sr-only", disabled: !isEditing }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: `w-8 h-8 mx-auto mb-2 rounded-full bg-${goal.color}-100 flex items-center justify-center`, children: _jsx(Target, { className: `w-4 h-4 text-${goal.color}-600` }) }), _jsx("div", { className: "font-medium text-gray-900", children: goal.label }), _jsx("div", { className: "text-sm text-gray-600", children: goal.description })] })] }, goal.value))) })] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Dietary Preferences" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: dietaryOptions.map((option) => (_jsxs("label", { className: `flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${userProfile.dietaryRestrictions?.includes(option)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'}`, children: [_jsx("input", { type: "checkbox", checked: userProfile.dietaryRestrictions?.includes(option) || false, onChange: (e) => {
                                                        if (e.target.checked) {
                                                            setUserProfile(prev => ({
                                                                ...prev,
                                                                dietaryRestrictions: [...(prev.dietaryRestrictions || []), option]
                                                            }));
                                                        }
                                                        else {
                                                            setUserProfile(prev => ({
                                                                ...prev,
                                                                dietaryRestrictions: (prev.dietaryRestrictions || []).filter(item => item !== option)
                                                            }));
                                                        }
                                                    }, className: "sr-only", disabled: !isEditing }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: option })] }, option))) })] }), isEditing && (_jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { onClick: () => setIsEditing(false), className: "px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors", children: "Cancel" }), _jsxs("button", { onClick: handleSave, className: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2", children: [_jsx(Save, { className: "w-4 h-4" }), _jsx("span", { children: "Save Changes" })] })] }))] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Metabolic Metrics" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 rounded-lg", children: [_jsx(Calculator, { className: "w-8 h-8 text-blue-600 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold text-blue-600", children: Math.round(bmr) }), _jsx("div", { className: "text-sm text-gray-600", children: "BMR (calories/day)" }), _jsx("div", { className: "text-xs text-gray-500", children: "Basal Metabolic Rate" })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 rounded-lg", children: [_jsx(Activity, { className: "w-8 h-8 text-green-600 mx-auto mb-2" }), _jsx("div", { className: "text-2xl font-bold text-green-600", children: Math.round(tdee) }), _jsx("div", { className: "text-sm text-gray-600", children: "TDEE (calories/day)" }), _jsx("div", { className: "text-xs text-gray-500", children: "Total Daily Energy Expenditure" })] })] })] }), nutritionGoals && (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Daily Nutrition Goals" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Flame, { className: "w-4 h-4 text-red-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Calories" })] }), _jsx("span", { className: "font-semibold", children: nutritionGoals.calories })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Protein" })] }), _jsxs("span", { className: "font-semibold", children: [nutritionGoals.protein, "g"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(TrendingUp, { className: "w-4 h-4 text-green-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Carbs" })] }), _jsxs("span", { className: "font-semibold", children: [nutritionGoals.carbs, "g"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Target, { className: "w-4 h-4 text-yellow-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Fat" })] }), _jsxs("span", { className: "font-semibold", children: [nutritionGoals.fat, "g"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Droplets, { className: "w-4 h-4 text-cyan-600" }), _jsx("span", { className: "text-sm text-gray-600", children: "Water" })] }), _jsxs("span", { className: "font-semibold", children: [nutritionGoals.water, "L"] })] })] })] })), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Goal Insights" }), _jsxs("div", { className: "space-y-3", children: [userProfile.goal === 'cutting' && (_jsxs("div", { className: "flex items-start space-x-3 p-3 bg-red-50 rounded-lg", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-red-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-red-900", children: "Cutting Phase" }), _jsx("p", { className: "text-xs text-red-700", children: "Maintain a 300-500 calorie deficit daily for optimal fat loss." })] })] })), userProfile.goal === 'bulking' && (_jsxs("div", { className: "flex items-start space-x-3 p-3 bg-green-50 rounded-lg", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-green-900", children: "Bulking Phase" }), _jsx("p", { className: "text-xs text-green-700", children: "Aim for a 200-400 calorie surplus to support muscle growth." })] })] })), userProfile.goal === 'recomposition' && (_jsxs("div", { className: "flex items-start space-x-3 p-3 bg-blue-50 rounded-lg", children: [_jsx(Target, { className: "w-5 h-5 text-blue-600 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-blue-900", children: "Recomposition" }), _jsx("p", { className: "text-xs text-blue-700", children: "Focus on strength training and adequate protein intake." })] })] }))] })] })] })] })] }));
};
export default EnhancedProfilePage;
