'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Key, Heart, Utensils, X, User, Bell, BarChart3, Calendar, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
const Sidebar = ({ isOpen, onToggle }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/',
            icon: LayoutDashboard,
            description: 'Overview and analytics'
        },
        {
            name: 'Activity',
            href: '/activity',
            icon: Activity,
            description: 'Recent activity feed'
        },
        {
            name: 'API Keys',
            href: '/api-keys',
            icon: Key,
            description: 'Manage API keys'
        },
        {
            name: 'Health Tips',
            href: '/health-tips',
            icon: Heart,
            description: 'Wellness recommendations'
        },
        {
            name: 'Nutrition',
            href: '/nutrition',
            icon: Utensils,
            description: 'Track your meals'
        },
        {
            name: 'Analytics',
            href: '/analytics',
            icon: BarChart3,
            description: 'Data insights'
        },
        {
            name: 'Calendar',
            href: '/calendar',
            icon: Calendar,
            description: 'Schedule events'
        },
        {
            name: 'Goals',
            href: '/goals',
            icon: Target,
            description: 'Set and track goals'
        }
    ];
    const isActive = (path) => {
        return pathname === path;
    };
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden", onClick: onToggle })), _jsxs("div", { className: cn("fixed top-0 left-0 z-50 h-full w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700", "transform transition-transform duration-300 ease-in-out", isOpen ? "translate-x-0" : "-translate-x-full", "lg:translate-x-0 lg:static lg:z-auto"), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 health-gradient rounded-xl flex items-center justify-center", children: _jsx(Heart, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "HealthHub" }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Your health companion" })] })] }), _jsx("button", { onClick: onToggle, className: "lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("nav", { className: "p-4 space-y-2", children: navigationItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (_jsxs(Link, { to: item.href, onClick: () => {
                                    // Close mobile sidebar after navigation
                                    if (window.innerWidth < 1024) {
                                        onToggle();
                                    }
                                }, className: cn("w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200", active
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"), children: [_jsx(Icon, { className: cn("w-5 h-5", active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400") }), _jsxs("div", { className: "flex-1 text-left", children: [_jsx("div", { className: "font-medium", children: item.name }), _jsx("div", { className: cn("text-xs", active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"), children: item.description })] }), active && (_jsx("div", { className: "w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" }))] }, item.name));
                        }) }), _jsx("div", { className: "p-4 border-t border-gray-200 dark:border-gray-700 mt-auto", children: _jsxs("div", { className: "flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center", children: _jsx(User, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-gray-900 dark:text-white", children: "John Doe" }), _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Health Enthusiast" })] }), _jsx("button", { className: "p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors", children: _jsx(Bell, { className: "w-4 h-4" }) })] }) }), _jsx("div", { className: "p-4", children: _jsxs("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-3", children: [_jsx(Activity, { className: "w-4 h-4 text-green-600 dark:text-green-400" }), _jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Today's Progress" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Steps" }), _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: "8,432" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Calories" }), _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: "1,247" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Water" }), _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: "6.2L" })] })] })] }) })] })] }));
};
export default Sidebar;
