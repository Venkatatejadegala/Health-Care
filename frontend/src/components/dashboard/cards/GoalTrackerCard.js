import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
const GoalTrackerCard = () => {
    const [goals, setGoals] = useState([
        {
            id: '1',
            title: 'Lose Weight',
            description: 'Reach target weight of 65kg',
            target: 65,
            current: 70,
            unit: 'kg',
            deadline: '2024-03-15',
            category: 'fitness',
            priority: 'high',
            icon: '🎯',
            color: '#ef4444'
        },
        {
            id: '2',
            title: 'Daily Steps',
            description: 'Walk 10,000 steps daily',
            target: 10000,
            current: 8432,
            unit: 'steps',
            deadline: '2024-02-29',
            category: 'fitness',
            priority: 'medium',
            icon: '👟',
            color: '#3b82f6'
        },
        {
            id: '3',
            title: 'Water Intake',
            description: 'Drink 8 glasses of water daily',
            target: 8,
            current: 6,
            unit: 'glasses',
            deadline: '2024-02-29',
            category: 'wellness',
            priority: 'high',
            icon: '💧',
            color: '#06b6d4'
        },
        {
            id: '4',
            title: 'Sleep Schedule',
            description: 'Sleep 8 hours every night',
            target: 8,
            current: 7.5,
            unit: 'hours',
            deadline: '2024-03-01',
            category: 'wellness',
            priority: 'medium',
            icon: '😴',
            color: '#8b5cf6'
        }
    ]);
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [newGoal, setNewGoal] = useState({
        title: '',
        description: '',
        target: '',
        unit: '',
        category: 'fitness',
        priority: 'medium'
    });
    const getProgressPercentage = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };
    const getDaysRemaining = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'fitness': return '💪';
            case 'nutrition': return '🍎';
            case 'wellness': return '🧘';
            case 'lifestyle': return '🌟';
            default: return '🎯';
        }
    };
    const addGoal = () => {
        if (!newGoal.title || !newGoal.target)
            return;
        const goal = {
            id: Date.now().toString(),
            title: newGoal.title,
            description: newGoal.description,
            target: parseFloat(newGoal.target),
            current: 0,
            unit: newGoal.unit,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            category: newGoal.category,
            priority: newGoal.priority,
            icon: getCategoryIcon(newGoal.category),
            color: getPriorityColor(newGoal.priority)
        };
        setGoals([...goals, goal]);
        setNewGoal({
            title: '',
            description: '',
            target: '',
            unit: '',
            category: 'fitness',
            priority: 'medium'
        });
        setShowAddGoal(false);
    };
    const updateGoalProgress = (goalId, increment) => {
        setGoals(goals.map(goal => {
            if (goal.id === goalId) {
                const newCurrent = Math.max(0, goal.current + increment);
                return { ...goal, current: newCurrent };
            }
            return goal;
        }));
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, style: {
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }, children: "\uD83C\uDFAF Goal Tracker" }), _jsx("button", { onClick: () => setShowAddGoal(!showAddGoal), style: {
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#2563eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#3b82f6', children: "+ Add Goal" })] }), showAddGoal && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, style: {
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid #e5e7eb'
                }, children: [_jsx("h4", { style: { margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }, children: "Add New Goal" }), _jsxs("div", { style: { display: 'grid', gap: '0.75rem' }, children: [_jsx("input", { type: "text", placeholder: "Goal title", value: newGoal.title, onChange: (e) => setNewGoal({ ...newGoal, title: e.target.value }), style: {
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem'
                                } }), _jsx("input", { type: "text", placeholder: "Description", value: newGoal.description, onChange: (e) => setNewGoal({ ...newGoal, description: e.target.value }), style: {
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.875rem'
                                } }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }, children: [_jsx("input", { type: "number", placeholder: "Target", value: newGoal.target, onChange: (e) => setNewGoal({ ...newGoal, target: e.target.value }), style: {
                                            padding: '0.5rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.875rem'
                                        } }), _jsx("input", { type: "text", placeholder: "Unit", value: newGoal.unit, onChange: (e) => setNewGoal({ ...newGoal, unit: e.target.value }), style: {
                                            padding: '0.5rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.875rem'
                                        } })] }), _jsxs("div", { style: { display: 'flex', gap: '0.5rem' }, children: [_jsxs("select", { value: newGoal.category, onChange: (e) => setNewGoal({ ...newGoal, category: e.target.value }), style: {
                                            flex: 1,
                                            padding: '0.5rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.875rem'
                                        }, children: [_jsx("option", { value: "fitness", children: "Fitness" }), _jsx("option", { value: "nutrition", children: "Nutrition" }), _jsx("option", { value: "wellness", children: "Wellness" }), _jsx("option", { value: "lifestyle", children: "Lifestyle" })] }), _jsxs("select", { value: newGoal.priority, onChange: (e) => setNewGoal({ ...newGoal, priority: e.target.value }), style: {
                                            flex: 1,
                                            padding: '0.5rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.875rem'
                                        }, children: [_jsx("option", { value: "low", children: "Low" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "high", children: "High" })] })] }), _jsxs("div", { style: { display: 'flex', gap: '0.5rem' }, children: [_jsx("button", { onClick: addGoal, style: {
                                            flex: 1,
                                            backgroundColor: '#10b981',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.375rem',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }, children: "Add Goal" }), _jsx("button", { onClick: () => setShowAddGoal(false), style: {
                                            flex: 1,
                                            backgroundColor: '#6b7280',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.375rem',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }, children: "Cancel" })] })] })] })), _jsx("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxHeight: '400px',
                    overflowY: 'auto'
                }, children: goals.map((goal, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3, delay: index * 0.1 }, style: {
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s'
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '0.75rem'
                            }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }, children: [_jsx("span", { style: { fontSize: '1.25rem' }, children: goal.icon }), _jsxs("div", { children: [_jsx("h4", { style: {
                                                        fontSize: '0.875rem',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        margin: 0
                                                    }, children: goal.title }), _jsx("p", { style: {
                                                        fontSize: '0.75rem',
                                                        color: '#6b7280',
                                                        margin: 0
                                                    }, children: goal.description })] })] }), _jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }, children: [_jsx("div", { style: {
                                                backgroundColor: getPriorityColor(goal.priority),
                                                color: 'white',
                                                padding: '0.125rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.625rem',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }, children: goal.priority }), _jsxs("span", { style: {
                                                fontSize: '0.75rem',
                                                color: '#6b7280'
                                            }, children: [getDaysRemaining(goal.deadline), "d left"] })] })] }), _jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem'
                            }, children: [_jsxs("span", { style: {
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: goal.color
                                    }, children: [goal.current.toFixed(goal.unit === 'kg' ? 1 : 0), " / ", goal.target, " ", goal.unit] }), _jsxs("span", { style: {
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }, children: [getProgressPercentage(goal.current, goal.target).toFixed(0), "%"] })] }), _jsx("div", { style: {
                                width: '100%',
                                height: '8px',
                                backgroundColor: '#e5e7eb',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                marginBottom: '0.75rem'
                            }, children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${getProgressPercentage(goal.current, goal.target)}%` }, transition: { duration: 1, delay: index * 0.1 }, style: {
                                    height: '100%',
                                    backgroundColor: goal.color,
                                    borderRadius: '4px'
                                } }) }), _jsxs("div", { style: {
                                display: 'flex',
                                gap: '0.5rem'
                            }, children: [_jsx("button", { onClick: () => updateGoalProgress(goal.id, -1), style: {
                                        flex: 1,
                                        backgroundColor: '#f3f4f6',
                                        color: '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        padding: '0.375rem',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: '500'
                                    }, children: "-1" }), _jsx("button", { onClick: () => updateGoalProgress(goal.id, 1), style: {
                                        flex: 1,
                                        backgroundColor: goal.color,
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.375rem',
                                        padding: '0.375rem',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: '500'
                                    }, children: "+1" })] })] }, goal.id))) }), goals.length === 0 && (_jsxs("div", { style: {
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#6b7280'
                }, children: [_jsx("div", { style: { fontSize: '3rem', marginBottom: '1rem' }, children: "\uD83C\uDFAF" }), _jsx("p", { style: { margin: '0 0 1rem 0', fontSize: '1rem' }, children: "No goals set yet. Start by adding your first goal!" })] }))] }));
};
export default GoalTrackerCard;
