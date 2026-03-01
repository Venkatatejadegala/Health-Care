import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
const { useState, useEffect } = React;
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../context/AuthContext';
const UserProfilePage = () => {
    const { user, token } = useAuth(); // Get user and token from auth context
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: '',
        age: 0,
        sex: '',
        height: 0,
        weight: 0,
        activityLevel: '',
        goal: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!user || !token) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }
        // Fetch user profile if it exists
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/api/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    if (response.status === 404) {
                        // Profile not found, so we'll just start with an empty form
                        return;
                    }
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setProfile(data.userProfile);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user, token, navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: name === 'age' || name === 'height' || name === 'weight' ? parseFloat(value) : value,
        }));
    };
    const handleSelectChange = (name, value) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profile),
            });
            if (!response.ok) {
                throw new Error('Failed to save user profile');
            }
            const data = await response.json();
            setProfile(data.userProfile); // Update with calculated values from backend
            alert('Profile saved successfully!');
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    if (loading && !profile.name) {
        return _jsx("div", { className: "flex justify-center items-center min-h-screen", children: "Loading profile..." });
    }
    return (_jsxs("div", { className: "max-w-4xl mx-auto space-y-8", children: [_jsx("div", { className: "bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center", children: _jsx("svg", { className: "w-8 h-8 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold gradient-text", children: "Profile Settings" }), _jsx("p", { className: "text-gray-600 text-lg", children: "Customize your health tracking preferences" })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "", children: _jsx(CardTitle, { className: "text-2xl font-bold text-gray-800", children: "Personal Information" }) }), _jsx(CardContent, { className: "", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", className: "text-sm font-semibold text-gray-700", children: "Full Name" }), _jsx(Input, { id: "name", name: "name", type: "text", value: profile.name, onChange: handleChange, required: true, className: "input-field", placeholder: "Enter your full name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "age", className: "text-sm font-semibold text-gray-700", children: "Age" }), _jsx(Input, { id: "age", name: "age", type: "number", value: profile.age, onChange: handleChange, required: true, className: "input-field", placeholder: "Enter your age" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sex", className: "text-sm font-semibold text-gray-700", children: "Gender" }), _jsxs(Select, { name: "sex", value: profile.sex, onValueChange: (value) => handleSelectChange('sex', value), children: [_jsx(SelectTrigger, { className: "input-field", children: _jsx(SelectValue, { placeholder: "Select your gender" }) }), _jsxs(SelectContent, { className: undefined, children: [_jsx(SelectItem, { value: "male", className: "", children: "Male" }), _jsx(SelectItem, { value: "female", className: "", children: "Female" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "height", className: "text-sm font-semibold text-gray-700", children: "Height (cm)" }), _jsx(Input, { id: "height", name: "height", type: "number", value: profile.height, onChange: handleChange, required: true, className: "input-field", placeholder: "Enter your height" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "weight", className: "text-sm font-semibold text-gray-700", children: "Weight (kg)" }), _jsx(Input, { id: "weight", name: "weight", type: "number", value: profile.weight, onChange: handleChange, required: true, className: "input-field", placeholder: "Enter your weight" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "activityLevel", className: "text-sm font-semibold text-gray-700", children: "Activity Level" }), _jsxs(Select, { name: "activityLevel", value: profile.activityLevel, onValueChange: (value) => handleSelectChange('activityLevel', value), children: [_jsx(SelectTrigger, { className: "input-field", children: _jsx(SelectValue, { placeholder: "Select your activity level" }) }), _jsxs(SelectContent, { className: undefined, children: [_jsx(SelectItem, { value: "sedentary", className: "", children: "Sedentary (little to no exercise)" }), _jsx(SelectItem, { value: "lightly_active", className: "", children: "Lightly Active (light exercise 1-3 days/week)" }), _jsx(SelectItem, { value: "moderately_active", className: "", children: "Moderately Active (moderate exercise 3-5 days/week)" }), _jsx(SelectItem, { value: "very_active", className: "", children: "Very Active (hard exercise 6-7 days/week)" }), _jsx(SelectItem, { value: "super_active", className: "", children: "Super Active (very hard exercise, physical job)" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "goal", className: "text-sm font-semibold text-gray-700", children: "Fitness Goal" }), _jsxs(Select, { name: "goal", value: profile.goal, onValueChange: (value) => handleSelectChange('goal', value), children: [_jsx(SelectTrigger, { className: "input-field", children: _jsx(SelectValue, { placeholder: "Select your fitness goal" }) }), _jsxs(SelectContent, { className: "", children: [_jsx(SelectItem, { value: "bulking", className: "", children: "Bulking (gain weight)" }), _jsx(SelectItem, { value: "cutting", className: "", children: "Cutting (lose weight)" }), _jsx(SelectItem, { value: "recomposition", className: "", children: "Recomposition (maintain weight)" })] })] })] }), error && (_jsx("div", { className: "bg-red-50 border border-red-200 rounded-xl p-3", children: _jsxs("p", { className: "text-red-600 text-sm font-medium", children: ["Error: ", error] }) })), _jsx(Button, { type: "submit", className: "btn-primary w-full", disabled: loading, variant: "default", size: "default", children: loading ? (_jsxs("div", { className: "flex items-center justify-center", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" }), "Saving Profile..."] })) : ('Save Profile') })] }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "", children: _jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: "Health Metrics" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-600 text-sm font-medium", children: "BMI" }), _jsx("p", { className: "text-2xl font-bold text-blue-800", children: profile.height && profile.weight ?
                                                                        (profile.weight / Math.pow(profile.height / 100, 2)).toFixed(1) : '--' })] }), _jsx("div", { className: "w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) })] }) }), _jsx("div", { className: "bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-green-600 text-sm font-medium", children: "BMR" }), _jsxs("p", { className: "text-2xl font-bold text-green-800", children: [profile.bmr ? Math.round(profile.bmr) : '--', " cal"] })] }), _jsx("div", { className: "w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) })] }) }), _jsx("div", { className: "bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-purple-600 text-sm font-medium", children: "TDEE" }), _jsxs("p", { className: "text-2xl font-bold text-purple-800", children: [profile.tdee ? Math.round(profile.tdee) : '--', " cal"] })] }), _jsx("div", { className: "w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" }) }) })] }) })] })] }), _jsxs(Card, { className: "card-modern", children: [_jsx(CardHeader, { className: "", children: _jsx(CardTitle, { className: "text-xl font-bold text-gray-800", children: "Daily Targets" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Calories" }), _jsxs("span", { className: "font-semibold text-gray-800", children: [profile.calorieTarget ? Math.round(profile.calorieTarget) : '--', " cal"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Protein" }), _jsxs("span", { className: "font-semibold text-gray-800", children: [profile.proteinTarget ? Math.round(profile.proteinTarget) : '--', " g"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Carbs" }), _jsxs("span", { className: "font-semibold text-gray-800", children: [profile.carbsTarget ? Math.round(profile.carbsTarget) : '--', " g"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "Fats" }), _jsxs("span", { className: "font-semibold text-gray-800", children: [profile.fatsTarget ? Math.round(profile.fatsTarget) : '--', " g"] })] })] })] })] })] })] }));
};
export default UserProfilePage;
