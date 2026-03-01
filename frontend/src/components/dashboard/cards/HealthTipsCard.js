import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const HealthTipsCard = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = [
        { id: 'all', label: 'All', icon: '🌟' },
        { id: 'nutrition', label: 'Nutrition', icon: '🍎' },
        { id: 'exercise', label: 'Exercise', icon: '💪' },
        { id: 'sleep', label: 'Sleep', icon: '😴' },
        { id: 'mental', label: 'Mental', icon: '🧠' }
    ];
    const tips = [
        {
            id: 1,
            category: 'nutrition',
            title: 'Stay Hydrated',
            description: 'Drink at least 8 glasses of water daily to maintain optimal body function.',
            icon: '💧',
            color: '#06b6d4'
        },
        {
            id: 2,
            category: 'exercise',
            title: 'Morning Stretches',
            description: 'Start your day with 10 minutes of stretching to improve flexibility.',
            icon: '🤸‍♀️',
            color: '#10b981'
        },
        {
            id: 3,
            category: 'sleep',
            title: 'Consistent Sleep Schedule',
            description: 'Go to bed and wake up at the same time every day for better sleep quality.',
            icon: '🌙',
            color: '#8b5cf6'
        },
        {
            id: 4,
            category: 'mental',
            title: 'Mindful Breathing',
            description: 'Practice 5 minutes of deep breathing exercises to reduce stress.',
            icon: '🧘‍♀️',
            color: '#f59e0b'
        },
        {
            id: 5,
            category: 'nutrition',
            title: 'Eat More Fiber',
            description: 'Include whole grains, fruits, and vegetables in your daily meals.',
            icon: '🥗',
            color: '#10b981'
        },
        {
            id: 6,
            category: 'exercise',
            title: 'Take the Stairs',
            description: 'Choose stairs over elevators to add more movement to your day.',
            icon: '🏃‍♂️',
            color: '#3b82f6'
        }
    ];
    const filteredTips = selectedCategory === 'all'
        ? tips
        : tips.filter(tip => tip.category === selectedCategory);
    return (_jsxs("div", { style: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            height: '100%'
        }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                }, children: [_jsx("h3", { style: {
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#1f2937',
                            margin: 0
                        }, children: "Health Tips" }), _jsx("button", { style: {
                            backgroundColor: '#f3f4f6',
                            border: 'none',
                            borderRadius: '0.375rem',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: '#6b7280',
                            transition: 'background-color 0.2s'
                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#e5e7eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#f3f4f6', children: "\uD83D\uDD04 Refresh" })] }), _jsx("div", { style: {
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem'
                }, children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), style: {
                        backgroundColor: selectedCategory === category.id ? '#3b82f6' : '#f3f4f6',
                        color: selectedCategory === category.id ? 'white' : '#374151',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }, onMouseOver: (e) => {
                        if (selectedCategory !== category.id) {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }
                    }, onMouseOut: (e) => {
                        if (selectedCategory !== category.id) {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }
                    }, children: [_jsx("span", { children: category.icon }), category.label] }, category.id))) }), _jsx("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxHeight: '400px',
                    overflowY: 'auto'
                }, children: filteredTips.map((tip) => (_jsxs("div", { style: {
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.5rem',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }, onMouseOver: (e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                        e.currentTarget.style.borderColor = '#d1d5db';
                    }, onMouseOut: (e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                    }, children: [_jsx("div", { style: {
                                width: '40px',
                                height: '40px',
                                backgroundColor: tip.color,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                marginRight: '0.75rem',
                                flexShrink: 0
                            }, children: tip.icon }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsx("h4", { style: {
                                        fontSize: '0.875rem',
                                        fontWeight: '600',
                                        color: '#1f2937',
                                        margin: '0 0 0.25rem 0'
                                    }, children: tip.title }), _jsx("p", { style: {
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        lineHeight: '1.4'
                                    }, children: tip.description })] }), _jsx("button", { style: {
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                color: '#9ca3af',
                                padding: '0.25rem',
                                marginLeft: '0.5rem',
                                flexShrink: 0
                            }, children: "\u2764\uFE0F" })] }, tip.id))) }), filteredTips.length === 0 && (_jsx("div", { style: {
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#6b7280'
                }, children: _jsx("p", { style: { margin: 0 }, children: "No tips available for this category." }) }))] }));
};
export default HealthTipsCard;
