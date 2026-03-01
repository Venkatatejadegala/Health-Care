import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
const NutritionPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [meals, setMeals] = useState([
        {
            id: 1,
            type: 'Breakfast',
            time: '08:00',
            items: [
                { name: 'Oatmeal with berries', calories: 250, protein: 8, carbs: 45, fat: 5 },
                { name: 'Greek yogurt', calories: 120, protein: 15, carbs: 8, fat: 2 }
            ]
        },
        {
            id: 2,
            type: 'Lunch',
            time: '13:00',
            items: [
                { name: 'Grilled chicken salad', calories: 320, protein: 25, carbs: 12, fat: 18 },
                { name: 'Quinoa', calories: 180, protein: 6, carbs: 32, fat: 3 }
            ]
        },
        {
            id: 3,
            type: 'Dinner',
            time: '19:00',
            items: [
                { name: 'Salmon fillet', calories: 280, protein: 30, carbs: 0, fat: 16 },
                { name: 'Steamed broccoli', calories: 50, protein: 4, carbs: 8, fat: 1 }
            ]
        }
    ]);
    const totalCalories = meals.reduce((total, meal) => total + meal.items.reduce((mealTotal, item) => mealTotal + item.calories, 0), 0);
    const totalProtein = meals.reduce((total, meal) => total + meal.items.reduce((mealTotal, item) => mealTotal + item.protein, 0), 0);
    const totalCarbs = meals.reduce((total, meal) => total + meal.items.reduce((mealTotal, item) => mealTotal + item.carbs, 0), 0);
    const totalFat = meals.reduce((total, meal) => total + meal.items.reduce((mealTotal, item) => mealTotal + item.fat, 0), 0);
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
                            }, children: "\uD83C\uDF4E Nutrition Tracker" }), _jsx("input", { type: "date", value: selectedDate, onChange: (e) => setSelectedDate(e.target.value), style: {
                                padding: '0.75rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            } })] }), _jsxs("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }, children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, style: {
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDD25" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Calories" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }, children: totalCalories }), _jsx("p", { style: { color: '#6b7280', fontSize: '0.875rem', margin: 0 }, children: "of 2000 goal" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, style: {
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDCAA" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Protein" }), _jsxs("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }, children: [totalProtein, "g"] }), _jsx("p", { style: { color: '#6b7280', fontSize: '0.875rem', margin: 0 }, children: "of 150g goal" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, style: {
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83C\uDF3E" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Carbs" }), _jsxs("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }, children: [totalCarbs, "g"] }), _jsx("p", { style: { color: '#6b7280', fontSize: '0.875rem', margin: 0 }, children: "of 250g goal" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, style: {
                                backgroundColor: 'white',
                                padding: '1.5rem',
                                borderRadius: '0.75rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83E\uDD51" }), _jsx("h3", { style: { color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Fat" }), _jsxs("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }, children: [totalFat, "g"] }), _jsx("p", { style: { color: '#6b7280', fontSize: '0.875rem', margin: 0 }, children: "of 65g goal" })] })] }), _jsx("div", { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }, children: meals.map((meal, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, style: {
                            backgroundColor: 'white',
                            borderRadius: '0.75rem',
                            padding: '1.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e5e7eb'
                        }, children: [_jsxs("div", { style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }, children: [_jsx("h3", { style: {
                                            fontSize: '1.25rem',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            margin: 0
                                        }, children: meal.type }), _jsx("span", { style: {
                                            backgroundColor: '#f3f4f6',
                                            color: '#6b7280',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.875rem'
                                        }, children: meal.time })] }), _jsx("div", { style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem'
                                }, children: meal.items.map((item, itemIndex) => (_jsxs("div", { style: {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '0.75rem',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #e5e7eb'
                                    }, children: [_jsxs("div", { children: [_jsx("p", { style: {
                                                        fontSize: '1rem',
                                                        fontWeight: '500',
                                                        color: '#1f2937',
                                                        margin: 0
                                                    }, children: item.name }), _jsxs("div", { style: {
                                                        display: 'flex',
                                                        gap: '1rem',
                                                        marginTop: '0.25rem'
                                                    }, children: [_jsxs("span", { style: { fontSize: '0.75rem', color: '#6b7280' }, children: [item.calories, " cal"] }), _jsxs("span", { style: { fontSize: '0.75rem', color: '#6b7280' }, children: [item.protein, "g protein"] }), _jsxs("span", { style: { fontSize: '0.75rem', color: '#6b7280' }, children: [item.carbs, "g carbs"] }), _jsxs("span", { style: { fontSize: '0.75rem', color: '#6b7280' }, children: [item.fat, "g fat"] })] })] }), _jsx("button", { style: {
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.375rem',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.75rem',
                                                cursor: 'pointer'
                                            }, children: "Remove" })] }, itemIndex))) }), _jsx("button", { style: {
                                    width: '100%',
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.75rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    marginTop: '1rem'
                                }, children: "+ Add Food Item" })] }, meal.id))) })] }) }));
};
export default NutritionPage;
