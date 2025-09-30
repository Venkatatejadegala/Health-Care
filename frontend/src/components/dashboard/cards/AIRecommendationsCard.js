import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { geminiService } from '../../../services/geminiService';
const AIRecommendationsCard = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const generateRecommendations = async () => {
        setIsLoading(true);
        setError('');
        try {
            // Mock user profile - in real app, this would come from user data
            const userProfile = {
                age: 28,
                gender: 'male',
                height: 175,
                weight: 70,
                activityLevel: 'moderate',
                goals: ['weight loss', 'muscle gain', 'better sleep']
            };
            const aiRecommendations = await geminiService.getHealthRecommendations(userProfile);
            setRecommendations(aiRecommendations);
        }
        catch (err) {
            setError('Failed to generate recommendations. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
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
            case 'nutrition': return '🍎';
            case 'exercise': return '💪';
            case 'sleep': return '😴';
            case 'mental': return '🧠';
            default: return '💡';
        }
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
                        }, children: "\uD83E\uDD16 AI Recommendations" }), _jsx("div", { style: {
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                        }, children: "\uD83E\uDD16 Real AI Powered" })] }), error && (_jsx("div", { style: {
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                }, children: error })), recommendations.length === 0 && !isLoading && (_jsxs("div", { style: {
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#6b7280'
                }, children: [_jsx("div", { style: { fontSize: '3rem', marginBottom: '1rem' }, children: "\uD83E\uDD16" }), _jsx("p", { style: { margin: '0 0 1rem 0', fontSize: '1rem' }, children: "Get personalized health recommendations powered by AI" }), _jsx("button", { onClick: generateRecommendations, style: {
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            transition: 'background-color 0.2s'
                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#2563eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#3b82f6', children: "Generate Recommendations" })] })), isLoading && (_jsxs("div", { style: {
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#6b7280'
                }, children: [_jsx("div", { style: {
                            width: '40px',
                            height: '40px',
                            border: '4px solid #e5e7eb',
                            borderTop: '4px solid #3b82f6',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem'
                        } }), _jsx("p", { style: { margin: 0 }, children: "AI is analyzing your profile..." })] })), recommendations.length > 0 && (_jsx("div", { style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxHeight: '400px',
                    overflowY: 'auto'
                }, children: recommendations.map((rec, index) => (_jsxs("div", { style: {
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
                                backgroundColor: '#3b82f6',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                marginRight: '0.75rem',
                                flexShrink: 0
                            }, children: getCategoryIcon(rec.category) }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.25rem'
                                    }, children: [_jsx("h4", { style: {
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                color: '#1f2937',
                                                margin: 0
                                            }, children: rec.title }), _jsx("div", { style: {
                                                backgroundColor: getPriorityColor(rec.priority),
                                                color: 'white',
                                                padding: '0.125rem 0.5rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.625rem',
                                                fontWeight: '500',
                                                textTransform: 'uppercase'
                                            }, children: rec.priority })] }), _jsx("p", { style: {
                                        fontSize: '0.75rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        lineHeight: '1.4'
                                    }, children: rec.description })] })] }, index))) })), recommendations.length > 0 && (_jsx("div", { style: { marginTop: '1rem', textAlign: 'center' }, children: _jsx("button", { onClick: generateRecommendations, disabled: isLoading, style: {
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }, onMouseOver: (e) => {
                        if (!isLoading) {
                            e.currentTarget.style.backgroundColor = '#e5e7eb';
                            e.currentTarget.style.borderColor = '#9ca3af';
                        }
                    }, onMouseOut: (e) => {
                        if (!isLoading) {
                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                            e.currentTarget.style.borderColor = '#d1d5db';
                        }
                    }, children: "\uD83D\uDD04 Generate New Recommendations" }) }))] }));
};
export default AIRecommendationsCard;
