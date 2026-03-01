'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Heart, Droplets, Moon, Apple, Dumbbell, Brain, ArrowRight, BookOpen, Star, Clock } from 'lucide-react';
const HealthTipsCard = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
        { id: 'all', name: 'All', count: 12 },
        { id: 'nutrition', name: 'Nutrition', count: 5 },
        { id: 'exercise', name: 'Exercise', count: 4 },
        { id: 'wellness', name: 'Wellness', count: 3 }
    ];
    const healthTips = [
        {
            id: 1,
            title: 'Stay Hydrated',
            description: 'Drink at least 8 glasses of water daily to maintain optimal body function and energy levels.',
            category: 'wellness',
            priority: 'high',
            icon: Droplets,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            readTime: '2 min read',
            rating: 4.8
        },
        {
            id: 2,
            title: 'Quality Sleep Matters',
            description: 'Aim for 7-9 hours of sleep per night to support recovery and cognitive function.',
            category: 'wellness',
            priority: 'high',
            icon: Moon,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            readTime: '3 min read',
            rating: 4.9
        },
        {
            id: 3,
            title: 'Balanced Nutrition',
            description: 'Include a variety of fruits, vegetables, lean proteins, and whole grains in your diet.',
            category: 'nutrition',
            priority: 'high',
            icon: Apple,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            readTime: '4 min read',
            rating: 4.7
        },
        {
            id: 4,
            title: 'Regular Exercise',
            description: 'Engage in at least 150 minutes of moderate-intensity exercise per week.',
            category: 'exercise',
            priority: 'medium',
            icon: Dumbbell,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            readTime: '3 min read',
            rating: 4.6
        },
        {
            id: 5,
            title: 'Mental Health',
            description: 'Practice mindfulness and stress management techniques for overall well-being.',
            category: 'wellness',
            priority: 'medium',
            icon: Brain,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            readTime: '5 min read',
            rating: 4.8
        }
    ];
    const filteredTips = selectedCategory === 'all'
        ? healthTips
        : healthTips.filter(tip => tip.category === selectedCategory);
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'text-red-600 bg-red-50 dark:bg-red-900/20';
            case 'medium':
                return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
            case 'low':
                return 'text-green-600 bg-green-50 dark:bg-green-900/20';
            default:
                return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
        }
    };
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center", children: _jsx(Heart, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Health Tips" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Personalized wellness recommendations" })] })] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors", children: _jsx(ArrowRight, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "mb-6", children: _jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), className: `px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`, children: [category.name, " (", category.count, ")"] }, category.id))) }) }), _jsx("div", { className: "space-y-4", children: filteredTips.map((tip) => {
                    const Icon = tip.icon;
                    return (_jsx("div", { className: "border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: `w-10 h-10 ${tip.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`, children: _jsx(Icon, { className: `w-5 h-5 ${tip.color}` }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: tip.title }), _jsxs("span", { className: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(tip.priority)}`, children: [tip.priority, " priority"] })] }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mb-3", children: tip.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), tip.readTime] }), _jsxs("span", { className: "flex items-center", children: [_jsx(Star, { className: "w-3 h-3 mr-1 text-yellow-500" }), tip.rating] })] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors", children: "Read more \u2192" })] })] })] }) }, tip.id));
                }) }), _jsx("div", { className: "mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [_jsx(BookOpen, { className: "w-4 h-4 inline mr-1" }), "Expert-curated health advice"] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors", children: "View all tips \u2192" })] }) })] }));
};
export default HealthTipsCard;
