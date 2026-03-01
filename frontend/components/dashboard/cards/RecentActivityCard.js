'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Activity, Clock, Heart, Droplets, ArrowRight, Calendar, Target } from 'lucide-react';
const RecentActivityCard = () => {
    const activities = [
        {
            id: 1,
            type: 'workout',
            title: 'Morning Run',
            description: 'Completed 5K run in 28 minutes',
            time: '2 hours ago',
            icon: Activity,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            value: '5.2 km'
        },
        {
            id: 2,
            type: 'meal',
            title: 'Breakfast Logged',
            description: 'Oatmeal with berries and protein',
            time: '4 hours ago',
            icon: Heart,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            value: '420 cal'
        },
        {
            id: 3,
            type: 'water',
            title: 'Water Intake',
            description: 'Drank 500ml of water',
            time: '6 hours ago',
            icon: Droplets,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50',
            value: '500ml'
        },
        {
            id: 4,
            type: 'sleep',
            title: 'Sleep Logged',
            description: '7.5 hours of quality sleep',
            time: 'Yesterday',
            icon: Clock,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            value: '7.5h'
        },
        {
            id: 5,
            type: 'goal',
            title: 'Goal Achieved',
            description: 'Daily step goal completed',
            time: 'Yesterday',
            icon: Target,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            value: '10,000'
        }
    ];
    const getActivityIcon = (type) => {
        const activity = activities.find(a => a.type === type);
        return activity?.icon || Activity;
    };
    const getActivityColor = (type) => {
        const activity = activities.find(a => a.type === type);
        return activity?.color || 'text-gray-600';
    };
    const getActivityBgColor = (type) => {
        const activity = activities.find(a => a.type === type);
        return activity?.bgColor || 'bg-gray-50';
    };
    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 activity-gradient rounded-lg flex items-center justify-center", children: _jsx(Activity, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "Recent Activity" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Your latest health activities" })] })] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors", children: _jsx(ArrowRight, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "space-y-4", children: activities.map((activity) => {
                    const Icon = activity.icon;
                    return (_jsxs("div", { className: "flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors", children: [_jsx("div", { className: `w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center`, children: _jsx(Icon, { className: `w-5 h-5 ${activity.color}` }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: activity.title }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: activity.time })] }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 truncate", children: activity.description })] }), _jsx("div", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: activity.value })] }, activity.id));
                }) }), _jsx("div", { className: "mt-6 pt-4 border-t border-gray-200 dark:border-gray-700", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: [_jsx(Calendar, { className: "w-4 h-4 inline mr-1" }), "View all activities"] }), _jsx("button", { className: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors", children: "See more \u2192" })] }) })] }));
};
export default RecentActivityCard;
