import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { nutritionService } from '../services/nutritionService';
import toast from 'react-hot-toast';
const NutritionTrackerPage = () => {
    const [mealName, setMealName] = useState('');
    const [isAddingMeal, setIsAddingMeal] = useState(false);
    const [dailyNutrition, setDailyNutrition] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    // Load daily nutrition data
    useEffect(() => {
        loadDailyNutrition();
    }, [selectedDate]);
    const loadDailyNutrition = () => {
        const data = nutritionService.getDailyNutrition(selectedDate);
        setDailyNutrition(data);
    };
    const handleAddMeal = async () => {
        if (!mealName.trim()) {
            toast.error('Please enter a meal name');
            return;
        }
        setIsAddingMeal(true);
        try {
            await nutritionService.addMeal(mealName.trim());
            setMealName('');
            loadDailyNutrition();
            toast.success(`Added ${mealName} to your meals!`);
        }
        catch (error) {
            toast.error('Failed to add meal. Please try again.');
        }
        finally {
            setIsAddingMeal(false);
        }
    };
    const handleRemoveMeal = (mealId) => {
        nutritionService.removeMeal(mealId);
        loadDailyNutrition();
        toast.success('Meal removed successfully!');
    };
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const getProgressPercentage = (current, goal) => {
        return Math.min((current / goal) * 100, 100);
    };
    const getProgressColor = (percentage) => {
        if (percentage >= 100)
            return '#ef4444'; // Red - over goal
        if (percentage >= 80)
            return '#f59e0b'; // Yellow - close to goal
        return '#10b981'; // Green - good progress
    };
    if (!dailyNutrition) {
        return (_jsx("div", { style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                fontSize: '1.125rem',
                color: '#6b7280'
            }, children: "Loading nutrition data..." }));
    }
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }, children: _jsxs("div", { style: { maxWidth: '1200px', margin: '0 auto' }, children: [_jsxs("div", { style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem'
                    }, children: [_jsx("h1", { style: {
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                margin: 0
                            }, children: "\uD83C\uDF4E Nutrition Tracker" }), _jsx("input", { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), style: {
                                padding: '0.5rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                fontSize: '1rem'
                            } })] }), _jsxs("div", { style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb',
                        marginBottom: '2rem'
                    }, children: [_jsx("h2", { style: {
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                marginBottom: '1rem'
                            }, children: "\u2795 Add Meal" }), _jsxs("div", { style: {
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'center'
                            }, children: [_jsx("input", { type: "text", placeholder: "Enter meal name (e.g., Grilled Chicken Breast, Rice Bowl, Apple)", value: mealName, onChange: (e) => setMealName(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleAddMeal(), style: {
                                        flex: 1,
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    } }), _jsx("button", { onClick: handleAddMeal, disabled: isAddingMeal || !mealName.trim(), style: {
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: isAddingMeal || !mealName.trim() ? '#9ca3af' : '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        cursor: isAddingMeal || !mealName.trim() ? 'not-allowed' : 'pointer',
                                        transition: 'background-color 0.2s'
                                    }, children: isAddingMeal ? 'Adding...' : 'Add Meal' })] }), _jsx("p", { style: {
                                fontSize: '0.875rem',
                                color: '#6b7280',
                                marginTop: '0.5rem',
                                margin: 0
                            }, children: "\uD83D\uDCA1 AI will analyze your meal and provide accurate nutrition information" })] }), _jsx("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }, children: [
                        { key: 'calories', label: 'Calories', unit: 'kcal', icon: '🔥' },
                        { key: 'protein', label: 'Protein', unit: 'g', icon: '💪' },
                        { key: 'carbs', label: 'Carbs', unit: 'g', icon: '🌾' },
                        { key: 'fat', label: 'Fat', unit: 'g', icon: '🥑' },
                        { key: 'fiber', label: 'Fiber', unit: 'g', icon: '🥬' }
                    ].map(({ key, label, unit, icon }) => {
                        const current = dailyNutrition[`total${key.charAt(0).toUpperCase() + key.slice(1)}`];
                        const goal = dailyNutrition.goals[key];
                        const remaining = dailyNutrition.remaining[key];
                        const percentage = getProgressPercentage(current, goal);
                        return (_jsxs("div", { style: {
                                backgroundColor: 'white',
                                borderRadius: '0.75rem',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb'
                            }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '1rem'
                                    }, children: [_jsxs("h3", { style: {
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#1f2937',
                                                margin: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }, children: [icon, " ", label] }), _jsxs("span", { style: {
                                                fontSize: '0.875rem',
                                                color: '#6b7280'
                                            }, children: [Math.round(percentage), "%"] })] }), _jsxs("div", { style: {
                                        marginBottom: '0.5rem'
                                    }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '0.875rem',
                                                color: '#6b7280',
                                                marginBottom: '0.25rem'
                                            }, children: [_jsxs("span", { children: [current.toFixed(0), " ", unit] }), _jsxs("span", { children: [goal, " ", unit] })] }), _jsx("div", { style: {
                                                width: '100%',
                                                height: '8px',
                                                backgroundColor: '#e5e7eb',
                                                borderRadius: '4px',
                                                overflow: 'hidden'
                                            }, children: _jsx("div", { style: {
                                                    width: `${percentage}%`,
                                                    height: '100%',
                                                    backgroundColor: getProgressColor(percentage),
                                                    transition: 'width 0.3s ease'
                                                } }) })] }), _jsx("div", { style: {
                                        fontSize: '0.75rem',
                                        color: remaining > 0 ? '#6b7280' : '#ef4444',
                                        fontWeight: '500'
                                    }, children: remaining > 0 ? `${remaining.toFixed(0)} ${unit} remaining` : 'Goal reached!' })] }, key));
                    }) }), _jsxs("div", { style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }, children: [_jsxs("h2", { style: {
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                marginBottom: '1rem'
                            }, children: ["\uD83D\uDCCB Today's Meals (", dailyNutrition.meals.length, ")"] }), dailyNutrition.meals.length === 0 ? (_jsxs("div", { style: {
                                textAlign: 'center',
                                padding: '2rem',
                                color: '#6b7280'
                            }, children: [_jsx("div", { style: { fontSize: '3rem', marginBottom: '1rem' }, children: "\uD83C\uDF7D\uFE0F" }), _jsx("p", { style: { fontSize: '1.125rem', margin: 0 }, children: "No meals added yet" }), _jsx("p", { style: { fontSize: '0.875rem', margin: '0.5rem 0 0 0' }, children: "Add your first meal above to start tracking your nutrition!" })] })) : (_jsx("div", { style: { display: 'grid', gap: '1rem' }, children: dailyNutrition.meals.map((meal) => (_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    backgroundColor: '#f8fafc',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #e2e8f0'
                                }, children: [_jsxs("div", { style: { flex: 1 }, children: [_jsxs("div", { style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    marginBottom: '0.25rem'
                                                }, children: [_jsx("h3", { style: {
                                                            fontSize: '1rem',
                                                            fontWeight: '600',
                                                            color: '#1f2937',
                                                            margin: 0
                                                        }, children: meal.name }), _jsx("span", { style: {
                                                            fontSize: '0.75rem',
                                                            color: '#6b7280'
                                                        }, children: formatTime(meal.timestamp) })] }), _jsxs("div", { style: {
                                                    display: 'flex',
                                                    gap: '1rem',
                                                    fontSize: '0.875rem',
                                                    color: '#6b7280'
                                                }, children: [_jsxs("span", { children: ["\uD83D\uDD25 ", meal.calories, " cal"] }), _jsxs("span", { children: ["\uD83D\uDCAA ", meal.protein, "g protein"] }), _jsxs("span", { children: ["\uD83C\uDF3E ", meal.carbs, "g carbs"] }), _jsxs("span", { children: ["\uD83E\uDD51 ", meal.fat, "g fat"] }), _jsxs("span", { children: ["\uD83E\uDD6C ", meal.fiber, "g fiber"] })] }), _jsxs("div", { style: {
                                                    fontSize: '0.75rem',
                                                    color: '#9ca3af',
                                                    marginTop: '0.25rem'
                                                }, children: [meal.serving, " \u2022 ", meal.confidence, "% confidence"] })] }), _jsx("button", { onClick: () => handleRemoveMeal(meal.id), style: {
                                            padding: '0.5rem',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.375rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            transition: 'background-color 0.2s'
                                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#dc2626', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#ef4444', children: "\uD83D\uDDD1\uFE0F Remove" })] }, meal.id))) }))] })] }) }));
};
export default NutritionTrackerPage;
