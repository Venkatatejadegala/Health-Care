import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
const HealthMetricsCard = () => {
    const [metrics, setMetrics] = useState([
        {
            id: 'steps',
            name: 'Daily Steps',
            value: 8432,
            unit: 'steps',
            target: 10000,
            trend: 'up',
            icon: '👟',
            color: '#3b82f6'
        },
        {
            id: 'calories',
            name: 'Calories Burned',
            value: 1247,
            unit: 'kcal',
            target: 1500,
            trend: 'up',
            icon: '🔥',
            color: '#ef4444'
        },
        {
            id: 'water',
            name: 'Water Intake',
            value: 6.2,
            unit: 'L',
            target: 8,
            trend: 'stable',
            icon: '💧',
            color: '#06b6d4'
        },
        {
            id: 'sleep',
            name: 'Sleep Duration',
            value: 7.5,
            unit: 'hrs',
            target: 8,
            trend: 'down',
            icon: '😴',
            color: '#8b5cf6'
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const getProgressPercentage = (value, target) => {
        return Math.min((value / target) * 100, 100);
    };
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return '📈';
            case 'down': return '📉';
            default: return '➡️';
        }
    };
    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up': return '#10b981';
            case 'down': return '#ef4444';
            default: return '#6b7280';
        }
    };
    const refreshMetrics = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Update metrics with some variation
        setMetrics(prev => prev.map(metric => ({
            ...metric,
            value: metric.value + (Math.random() - 0.5) * metric.value * 0.1,
            trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)]
        })));
        setIsLoading(false);
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
                        }, children: "\uD83D\uDCCA Health Metrics" }), _jsx("button", { onClick: refreshMetrics, disabled: isLoading, style: {
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            opacity: isLoading ? 0.6 : 1
                        }, onMouseOver: (e) => {
                            if (!isLoading) {
                                e.currentTarget.style.backgroundColor = '#e5e7eb';
                            }
                        }, onMouseOut: (e) => {
                            if (!isLoading) {
                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }
                        }, children: isLoading ? '⏳' : '🔄' })] }), _jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }, children: metrics.map((metric, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.3, delay: index * 0.1 }, style: {
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '0.75rem'
                            }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }, children: [_jsx("span", { style: { fontSize: '1.5rem' }, children: metric.icon }), _jsx("span", { style: {
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151'
                                            }, children: metric.name })] }), _jsx("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem',
                                        color: getTrendColor(metric.trend),
                                        fontSize: '0.75rem'
                                    }, children: _jsx("span", { children: getTrendIcon(metric.trend) }) })] }), _jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '0.25rem',
                                marginBottom: '0.5rem'
                            }, children: [_jsx("span", { style: {
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: metric.color
                                    }, children: metric.value.toFixed(metric.unit === 'L' ? 1 : 0) }), _jsx("span", { style: {
                                        fontSize: '0.875rem',
                                        color: '#6b7280'
                                    }, children: metric.unit })] }), _jsxs("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }, children: [_jsxs("span", { style: {
                                        fontSize: '0.75rem',
                                        color: '#6b7280'
                                    }, children: ["Target: ", metric.target, " ", metric.unit] }), _jsxs("span", { style: {
                                        fontSize: '0.75rem',
                                        fontWeight: '500',
                                        color: '#374151'
                                    }, children: [getProgressPercentage(metric.value, metric.target).toFixed(0), "%"] })] }), _jsx("div", { style: {
                                width: '100%',
                                height: '6px',
                                backgroundColor: '#e5e7eb',
                                borderRadius: '3px',
                                overflow: 'hidden'
                            }, children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${getProgressPercentage(metric.value, metric.target)}%` }, transition: { duration: 1, delay: index * 0.1 }, style: {
                                    height: '100%',
                                    backgroundColor: metric.color,
                                    borderRadius: '3px'
                                } }) })] }, metric.id))) }), _jsxs("div", { style: {
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '0.5rem',
                    border: '1px solid #bae6fd'
                }, children: [_jsxs("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }, children: [_jsx("span", { style: { fontSize: '1rem' }, children: "\uD83D\uDCA1" }), _jsx("span", { style: {
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#1e40af'
                                }, children: "Today's Insight" })] }), _jsx("p", { style: {
                            fontSize: '0.75rem',
                            color: '#1e40af',
                            margin: 0,
                            lineHeight: '1.4'
                        }, children: "You're doing great with your daily steps! Try to increase your water intake to reach your hydration goal." })] })] }));
};
export default HealthMetricsCard;
