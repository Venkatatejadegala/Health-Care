import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { geminiService } from '../services/geminiService';
const RecommendationsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasGenerated, setHasGenerated] = useState(false);
    // New state for AI chat feature
    const [userQuestion, setUserQuestion] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAskingAI, setIsAskingAI] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [apiTestResult, setApiTestResult] = useState('');
    const categories = [
        { id: 'all', name: 'All', icon: '📊' },
        { id: 'nutrition', name: 'Nutrition', icon: '🍎' },
        { id: 'exercise', name: 'Exercise', icon: '💪' },
        { id: 'sleep', name: 'Sleep', icon: '😴' },
        { id: 'mental', name: 'Mental Health', icon: '🧠' },
        { id: 'general', name: 'General', icon: '💡' }
    ];
    const generateAIRecommendations = async () => {
        setIsLoading(true);
        setError('');
        setHasGenerated(false);
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
            setHasGenerated(true);
        }
        catch (err) {
            setError('Failed to generate AI recommendations. Please try again.');
            console.error('Error generating recommendations:', err);
        }
        finally {
            setIsLoading(false);
        }
    };
    const askAIAboutFood = async () => {
        if (!userQuestion.trim())
            return;
        setIsAskingAI(true);
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
            console.log('Starting AI request...');
            const response = await geminiService.askAboutFoodAndHealth(userQuestion, userProfile);
            console.log('AI response received:', response);
            setAiResponse(response);
            // Add to chat history
            setChatHistory(prev => [...prev, { question: userQuestion, answer: response }]);
            setUserQuestion('');
        }
        catch (err) {
            console.error('Error asking AI:', err);
            setError(`Failed to get AI response: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`);
        }
        finally {
            setIsAskingAI(false);
        }
    };
    const testAPIConnection = async () => {
        setApiTestResult('🔍 Testing API connection...');
        try {
            const isWorking = await geminiService.testConnection();
            setApiTestResult(isWorking ? '✅ API connection successful!' : '❌ API connection failed');
        }
        catch (err) {
            setApiTestResult(`❌ API test error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
    };
    const filteredRecommendations = selectedCategory === 'all'
        ? recommendations
        : recommendations.filter(rec => rec.category === selectedCategory);
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
            case 'general': return '💡';
            default: return '💡';
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'nutrition': return '#10b981';
            case 'exercise': return '#3b82f6';
            case 'sleep': return '#8b5cf6';
            case 'mental': return '#ef4444';
            case 'general': return '#6b7280';
            default: return '#6b7280';
        }
    };
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
                                color: '#1f2937',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                margin: 0
                            }, children: "\uD83D\uDCA1 AI Health Recommendations" }), !hasGenerated && !isLoading && (_jsx("button", { onClick: generateAIRecommendations, style: {
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.5rem',
                                padding: '0.75rem 1.5rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'background-color 0.2s'
                            }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#2563eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#3b82f6', children: "\uD83E\uDD16 Generate AI Recommendations" }))] }), error && (_jsx("div", { style: {
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '2rem',
                        fontSize: '0.875rem'
                    }, children: error })), isLoading && (_jsxs("div", { style: {
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb',
                        marginBottom: '2rem'
                    }, children: [_jsx("div", { style: {
                                width: '60px',
                                height: '60px',
                                border: '4px solid #e5e7eb',
                                borderTop: '4px solid #3b82f6',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 1rem'
                            } }), _jsx("h3", { style: {
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '0.5rem'
                            }, children: "AI is analyzing your profile..." }), _jsx("p", { style: {
                                color: '#6b7280',
                                margin: 0
                            }, children: "Generating personalized health recommendations based on your data" })] })), !hasGenerated && !isLoading && !error && (_jsxs("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        marginBottom: '2rem'
                    }, children: [_jsxs("div", { style: {
                                textAlign: 'center',
                                padding: '2rem',
                                backgroundColor: 'white',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb'
                            }, children: [_jsx("div", { style: { fontSize: '3rem', marginBottom: '1rem' }, children: "\uD83E\uDD16" }), _jsx("h3", { style: {
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: '#1f2937',
                                        marginBottom: '1rem'
                                    }, children: "Get AI Recommendations" }), _jsx("p", { style: {
                                        color: '#6b7280',
                                        fontSize: '0.875rem',
                                        marginBottom: '1.5rem'
                                    }, children: "Get personalized health recommendations based on your profile and goals." }), _jsx("button", { onClick: generateAIRecommendations, style: {
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s'
                                    }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#059669', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#10b981', children: "Generate Recommendations" })] }), _jsxs("div", { style: {
                                padding: '2rem',
                                backgroundColor: 'white',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb'
                            }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '1rem'
                                    }, children: [_jsx("div", { style: { fontSize: '1.5rem' }, children: "\uD83C\uDF4E" }), _jsx("h3", { style: {
                                                fontSize: '1.25rem',
                                                fontWeight: 'bold',
                                                color: '#1f2937',
                                                margin: 0
                                            }, children: "Ask AI About Food & Health" })] }), _jsx("p", { style: {
                                        color: '#6b7280',
                                        fontSize: '0.875rem',
                                        marginBottom: '1rem'
                                    }, children: "Ask questions about food, nutrients, health issues, and how they relate to your goals." }), _jsx("div", { style: { marginBottom: '1rem' }, children: _jsx("textarea", { value: userQuestion, onChange: (e) => setUserQuestion(e.target.value), placeholder: "Ask about food, nutrients, health issues... (e.g., 'What foods help with muscle gain?', 'Is quinoa good for weight loss?')", style: {
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            fontSize: '0.875rem',
                                            resize: 'vertical',
                                            minHeight: '80px'
                                        } }) }), _jsxs("div", { style: { display: 'flex', gap: '0.5rem' }, children: [_jsx("button", { onClick: askAIAboutFood, disabled: !userQuestion.trim() || isAskingAI, style: {
                                                flex: 1,
                                                backgroundColor: !userQuestion.trim() || isAskingAI ? '#9ca3af' : '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                padding: '0.75rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                cursor: !userQuestion.trim() || isAskingAI ? 'not-allowed' : 'pointer',
                                                transition: 'background-color 0.2s'
                                            }, onMouseOver: (e) => {
                                                if (userQuestion.trim() && !isAskingAI) {
                                                    e.currentTarget.style.backgroundColor = '#2563eb';
                                                }
                                            }, onMouseOut: (e) => {
                                                if (userQuestion.trim() && !isAskingAI) {
                                                    e.currentTarget.style.backgroundColor = '#3b82f6';
                                                }
                                            }, children: isAskingAI ? '🤖 AI is thinking...' : '🤖 Ask AI' }), _jsx("button", { onClick: testAPIConnection, style: {
                                                backgroundColor: '#f59e0b',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                padding: '0.75rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.2s'
                                            }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#d97706', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#f59e0b', children: "\uD83D\uDD27 Test API" })] }), apiTestResult && (_jsx("div", { style: {
                                        marginTop: '0.5rem',
                                        padding: '0.5rem',
                                        backgroundColor: apiTestResult.includes('✅') ? '#f0fdf4' : '#fef2f2',
                                        border: `1px solid ${apiTestResult.includes('✅') ? '#bbf7d0' : '#fecaca'}`,
                                        borderRadius: '0.375rem',
                                        fontSize: '0.75rem',
                                        color: apiTestResult.includes('✅') ? '#166534' : '#dc2626'
                                    }, children: apiTestResult }))] })] })), (aiResponse || chatHistory.length > 0) && (_jsxs("div", { style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb',
                        marginBottom: '2rem'
                    }, children: [_jsx("h3", { style: {
                                fontSize: '1.125rem',
                                fontWeight: '600',
                                color: '#1f2937',
                                marginBottom: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }, children: "\uD83E\uDD16 AI Health Expert" }), chatHistory.length > 0 && (_jsx("div", { style: { marginBottom: '1rem' }, children: chatHistory.map((chat, index) => (_jsxs("div", { style: { marginBottom: '0.75rem' }, children: [_jsxs("div", { style: {
                                            backgroundColor: '#f8fafc',
                                            padding: '0.5rem 0.75rem',
                                            borderRadius: '0.375rem',
                                            marginBottom: '0.25rem',
                                            fontSize: '0.8rem',
                                            color: '#475569',
                                            border: '1px solid #e2e8f0'
                                        }, children: [_jsx("strong", { children: "Q:" }), " ", chat.question] }), _jsxs("div", { style: {
                                            backgroundColor: '#f0f9ff',
                                            padding: '0.5rem 0.75rem',
                                            borderRadius: '0.375rem',
                                            fontSize: '0.8rem',
                                            color: '#0c4a6e',
                                            border: '1px solid #bae6fd',
                                            lineHeight: '1.4'
                                        }, children: [_jsx("strong", { children: "A:" }), " ", chat.answer] })] }, index))) })), aiResponse && (_jsxs("div", { style: {
                                backgroundColor: '#f0fdf4',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #bbf7d0',
                                fontSize: '0.8rem',
                                color: '#166534',
                                lineHeight: '1.4'
                            }, children: [_jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem'
                                    }, children: [_jsx("span", { style: { fontSize: '1rem' }, children: "\uD83D\uDCA1" }), _jsx("strong", { children: "Expert Answer:" })] }), _jsx("div", { style: { whiteSpace: 'pre-wrap' }, children: aiResponse })] }))] })), hasGenerated && (_jsx("div", { style: {
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem'
                    }, children: categories.map((category) => (_jsxs("button", { onClick: () => setSelectedCategory(category.id), style: {
                            backgroundColor: selectedCategory === category.id ? '#3b82f6' : '#f3f4f6',
                            color: selectedCategory === category.id ? 'white' : '#374151',
                            border: 'none',
                            borderRadius: '9999px',
                            padding: '0.75rem 1.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }, onMouseOver: (e) => {
                            if (selectedCategory !== category.id) {
                                e.currentTarget.style.backgroundColor = '#e5e7eb';
                            }
                        }, onMouseOut: (e) => {
                            if (selectedCategory !== category.id) {
                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }
                        }, children: [_jsx("span", { children: category.icon }), _jsx("span", { children: category.name })] }, category.id))) })), hasGenerated && (_jsx("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '1.5rem'
                    }, children: filteredRecommendations.map((rec, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, style: {
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                        }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem'
                            }, children: [_jsx("div", { style: {
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: getCategoryColor(rec.category),
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                        flexShrink: 0
                                    }, children: getCategoryIcon(rec.category) }), _jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                marginBottom: '0.5rem'
                                            }, children: [_jsx("h3", { style: {
                                                        fontSize: '1.125rem',
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
                                                fontSize: '0.875rem',
                                                color: '#6b7280',
                                                margin: '0 0 1rem 0',
                                                lineHeight: '1.5'
                                            }, children: rec.description }), _jsxs("div", { style: {
                                                display: 'flex',
                                                gap: '0.5rem'
                                            }, children: [_jsx("button", { style: {
                                                        backgroundColor: '#10b981',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '0.375rem',
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s'
                                                    }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#059669', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#10b981', children: "\u2713 Mark as Done" }), _jsx("button", { style: {
                                                        backgroundColor: '#f3f4f6',
                                                        color: '#374151',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.375rem',
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }, onMouseOver: (e) => {
                                                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                                                        e.currentTarget.style.borderColor = '#9ca3af';
                                                    }, onMouseOut: (e) => {
                                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                        e.currentTarget.style.borderColor = '#d1d5db';
                                                    }, children: "\uD83D\uDCC5 Schedule" }), _jsx("button", { style: {
                                                        backgroundColor: '#f3f4f6',
                                                        color: '#374151',
                                                        border: '1px solid #d1d5db',
                                                        borderRadius: '0.375rem',
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }, onMouseOver: (e) => {
                                                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                                                        e.currentTarget.style.borderColor = '#9ca3af';
                                                    }, onMouseOut: (e) => {
                                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                        e.currentTarget.style.borderColor = '#d1d5db';
                                                    }, children: "\u2139\uFE0F Learn More" })] })] })] }) }, index))) })), hasGenerated && (_jsxs(_Fragment, { children: [_jsxs("div", { style: {
                                marginTop: '2rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem'
                            }, children: [_jsxs("div", { style: {
                                        backgroundColor: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDCCA" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Total Recommendations" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }, children: recommendations.length })] }), _jsxs("div", { style: {
                                        backgroundColor: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDD25" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "High Priority" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }, children: recommendations.filter(r => r.priority === 'high').length })] }), _jsxs("div", { style: {
                                        backgroundColor: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83C\uDFAF" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Categories" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }, children: new Set(recommendations.map(r => r.category)).size })] }), _jsxs("div", { style: {
                                        backgroundColor: 'white',
                                        padding: '1.5rem',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid #e5e7eb',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83E\uDD16" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "AI Generated" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }, children: "\u2713" })] })] }), _jsx("div", { style: {
                                marginTop: '2rem',
                                textAlign: 'center'
                            }, children: _jsxs("button", { onClick: generateAIRecommendations, disabled: isLoading, style: {
                                    backgroundColor: isLoading ? '#9ca3af' : '#f59e0b',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    margin: '0 auto',
                                    transition: 'background-color 0.2s'
                                }, onMouseOver: (e) => {
                                    if (!isLoading) {
                                        e.currentTarget.style.backgroundColor = '#d97706';
                                    }
                                }, onMouseOut: (e) => {
                                    if (!isLoading) {
                                        e.currentTarget.style.backgroundColor = '#f59e0b';
                                    }
                                }, children: ["\uD83D\uDD04 ", isLoading ? 'Generating...' : 'Generate New Recommendations'] }) })] }))] }) }));
};
export default RecommendationsPage;
