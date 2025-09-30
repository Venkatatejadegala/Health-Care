import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, Activity, Heart, Target, Calendar, BarChart3, Zap } from 'lucide-react';
import RecentActivityCard from '../components/dashboard/cards/RecentActivityCard';
import ApiKeyManagementCard from '../../components/dashboard/cards/ApiKeyManagementCard';
import HealthTipsCard from '../components/dashboard/cards/HealthTipsCard';
import NutritionTrackerCard from '../components/dashboard/cards/NutritionTrackerCard';
const ModernDashboardPage = () => {
    const stats = [
        {
            title: 'Total Steps',
            value: '8,432',
            change: '+12%',
            changeType: 'positive',
            icon: Activity,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Calories Burned',
            value: '1,247',
            change: '+8%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Water Intake',
            value: '6.2L',
            change: '+15%',
            changeType: 'positive',
            icon: Heart,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50'
        },
        {
            title: 'Sleep Quality',
            value: '85%',
            change: '+5%',
            changeType: 'positive',
            icon: Target,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center", children: _jsx(Heart, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: "Welcome back, John!" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400 text-lg", children: "Ready to track your health journey today?" })] })] }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("div", { className: `w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`, children: _jsx(Icon, { className: `w-6 h-6 ${stat.color}` }) }), _jsx("div", { className: `text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`, children: stat.change })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: stat.title }), _jsx("p", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: stat.value })] })] }, index));
                }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(RecentActivityCard, {}), _jsx(ApiKeyManagementCard, {})] }), _jsxs("div", { className: "space-y-6", children: [_jsx(HealthTipsCard, {}), _jsx(NutritionTrackerCard, {})] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center", children: _jsx(Calendar, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Weekly Goal" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Progress tracking" })] })] }), _jsx("div", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "75%" }), _jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-orange-500 h-2 rounded-full", style: { width: '75%' } }) }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-2", children: "5 of 7 days completed" })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center", children: _jsx(BarChart3, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Health Score" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Overall wellness" })] })] }), _jsx("div", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "8.5/10" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "flex space-x-1", children: [[...Array(5)].map((_, i) => (_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }, i))), [...Array(5)].map((_, i) => (_jsx("div", { className: "w-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full" }, i)))] }), _jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Excellent" })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center", children: _jsx(Zap, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Streak" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Days in a row" })] })] }), _jsx("div", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "12" }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Keep it up! \uD83D\uDD25" })] })] })] }));
};
export default ModernDashboardPage;
