import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const NutritionTrackerCard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('today');
    const periods = [
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This Week' },
        { id: 'month', label: 'This Month' }
    ];
    const nutritionData = {
        calories: { consumed: 1850, goal: 2200, unit: 'kcal' },
        protein: { consumed: 85, goal: 120, unit: 'g' },
        carbs: { consumed: 180, goal: 250, unit: 'g' },
        fat: { consumed: 65, goal: 80, unit: 'g' },
        fiber: { consumed: 25, goal: 30, unit: 'g' },
        water: { consumed: 6.5, goal: 8, unit: 'glasses' }
    };
    const getProgressPercentage = (consumed, goal) => {
        return Math.min((consumed / goal) * 100, 100);
    };
    const getProgressColor = (percentage) => {
        if (percentage >= 90)
            return '#10b981'; // green
        if (percentage >= 70)
            return '#f59e0b'; // yellow
        return '#ef4444'; // red
    };
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
                        }, children: "Nutrition Tracker" }), _jsx("div", { style: { display: 'flex', gap: '0.5rem' }, children: periods.map((period) => (_jsx("button", { onClick: () => setSelectedPeriod(period.id), style: {
                                backgroundColor: selectedPeriod === period.id ? '#3b82f6' : '#f3f4f6',
                                color: selectedPeriod === period.id ? 'white' : '#374151',
                                border: 'none',
                                borderRadius: '0.375rem',
                                padding: '0.5rem 0.75rem',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }, onMouseOver: (e) => {
                                if (selectedPeriod !== period.id) {
                                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                                }
                            }, onMouseOut: (e) => {
                                if (selectedPeriod !== period.id) {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                }
                            }, children: period.label }, period.id))) })] }), _jsxs("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }, children: [_jsxs("div", { style: {
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            textAlign: 'center'
                        }, children: [_jsx("div", { style: {
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#dc2626',
                                    marginBottom: '0.25rem'
                                }, children: nutritionData.calories.consumed }), _jsx("div", { style: {
                                    fontSize: '0.75rem',
                                    color: '#991b1b'
                                }, children: "Calories Consumed" })] }), _jsxs("div", { style: {
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            textAlign: 'center'
                        }, children: [_jsx("div", { style: {
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#16a34a',
                                    marginBottom: '0.25rem'
                                }, children: nutritionData.water.consumed }), _jsx("div", { style: {
                                    fontSize: '0.75rem',
                                    color: '#166534'
                                }, children: "Glasses of Water" })] })] }), _jsxs("div", { style: { marginBottom: '1.5rem' }, children: [_jsx("h4", { style: {
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem'
                        }, children: "Macro Breakdown" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, children: Object.entries(nutritionData).filter(([key]) => ['protein', 'carbs', 'fat', 'fiber'].includes(key)).map(([key, data]) => {
                            const percentage = getProgressPercentage(data.consumed, data.goal);
                            const color = getProgressColor(percentage);
                            return (_jsxs("div", { children: [_jsxs("div", { style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '0.25rem'
                                        }, children: [_jsx("span", { style: {
                                                    fontSize: '0.875rem',
                                                    fontWeight: '500',
                                                    color: '#374151',
                                                    textTransform: 'capitalize'
                                                }, children: key }), _jsxs("span", { style: {
                                                    fontSize: '0.875rem',
                                                    color: '#6b7280'
                                                }, children: [data.consumed, "/", data.goal, " ", data.unit] })] }), _jsx("div", { style: {
                                            width: '100%',
                                            height: '8px',
                                            backgroundColor: '#e5e7eb',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }, children: _jsx("div", { style: {
                                                width: `${percentage}%`,
                                                height: '100%',
                                                backgroundColor: color,
                                                borderRadius: '4px',
                                                transition: 'width 0.3s ease'
                                            } }) })] }, key));
                        }) })] }), _jsxs("div", { style: { display: 'flex', gap: '0.75rem' }, children: [_jsx("button", { style: {
                            flex: 1,
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#2563eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#3b82f6', children: "\u2795 Log Meal" }), _jsx("button", { style: {
                            flex: 1,
                            backgroundColor: '#f3f4f6',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            padding: '0.75rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }, onMouseOver: (e) => {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                            e.currentTarget.style.borderColor = '#9ca3af';
                        }, onMouseOut: (e) => {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                            e.currentTarget.style.borderColor = '#d1d5db';
                        }, children: "\uD83D\uDCCA View Details" })] })] }));
};
export default NutritionTrackerCard;
