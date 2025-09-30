import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
const SignupPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        gender: '',
        height: '',
        weight: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { login } = useAuth();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Mock signup - in real app, this would be an API call
            const mockUser = {
                id: '1',
                email: formData.email,
                username: formData.username
            };
            login('mock-jwt-token', mockUser);
            setSuccess(true);
            // Redirect to dashboard after successful signup
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        }
        catch (err) {
            setError('Signup failed. Please try again.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
            padding: '1rem'
        }, children: _jsxs("div", { style: {
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '500px',
                margin: '1rem'
            }, children: [_jsxs("div", { style: { textAlign: 'center', marginBottom: '2rem' }, children: [_jsx("div", { style: {
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#10b981',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem',
                                fontSize: '24px'
                            }, children: "\uD83D\uDE80" }), _jsx("h1", { style: {
                                color: '#1f2937',
                                fontSize: '1.875rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }, children: "Create Account" }), _jsx("p", { style: { color: '#6b7280', fontSize: '1rem' }, children: "Join Health Dashboard and start your wellness journey" })] }), success && (_jsx("div", { style: {
                        backgroundColor: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        color: '#166534',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        textAlign: 'center'
                    }, children: "\uD83C\uDF89 Account created successfully! Redirecting to dashboard..." })), error && (_jsx("div", { style: {
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem'
                    }, children: error })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }, children: [_jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.5rem'
                                            }, children: "Username" }), _jsx("input", { type: "text", name: "username", value: formData.username, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Username" })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.5rem'
                                            }, children: "Age" }), _jsx("input", { type: "number", name: "age", value: formData.age, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Age" })] })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { style: {
                                        display: 'block',
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem'
                                    }, children: "Email Address" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, required: true, style: {
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Enter your email" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }, children: [_jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.5rem'
                                            }, children: "Gender" }), _jsxs("select", { name: "gender", value: formData.gender, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                                backgroundColor: 'white'
                                            }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', children: [_jsx("option", { value: "", children: "Select Gender" }), _jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.5rem'
                                            }, children: "Height (cm)" }), _jsx("input", { type: "number", name: "height", value: formData.height, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Height" })] })] }), _jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { style: {
                                        display: 'block',
                                        color: '#374151',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        marginBottom: '0.5rem'
                                    }, children: "Weight (kg)" }), _jsx("input", { type: "number", name: "weight", value: formData.weight, onChange: handleChange, required: true, style: {
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Weight" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }, children: [_jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.5rem'
                                            }, children: "Password" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Password" })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                marginBottom: '0.5rem'
                                            }, children: "Confirm Password" }), _jsx("input", { type: "password", name: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, required: true, style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Confirm Password" })] })] }), _jsx("button", { type: "submit", disabled: isLoading || success, style: {
                                width: '100%',
                                backgroundColor: isLoading || success ? '#9ca3af' : '#10b981',
                                color: 'white',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: isLoading || success ? 'not-allowed' : 'pointer',
                                transition: 'background-color 0.2s',
                                marginBottom: '1rem'
                            }, onMouseOver: (e) => {
                                if (!isLoading && !success) {
                                    e.currentTarget.style.backgroundColor = '#059669';
                                }
                            }, onMouseOut: (e) => {
                                if (!isLoading && !success) {
                                    e.currentTarget.style.backgroundColor = '#10b981';
                                }
                            }, children: isLoading ? 'Creating Account...' : success ? '✓ Account Created!' : 'Create Account' })] }), _jsx("div", { style: { textAlign: 'center' }, children: _jsxs("p", { style: { color: '#6b7280', fontSize: '0.875rem' }, children: ["Already have an account?", ' ', _jsx("button", { onClick: () => window.location.href = '/login', style: {
                                    color: '#3b82f6',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    textDecoration: 'underline'
                                }, children: "Sign in here" })] }) })] }) }));
};
export default SignupPage;
