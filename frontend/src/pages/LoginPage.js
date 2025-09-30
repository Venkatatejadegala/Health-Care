import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { login } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Mock login - in real app, this would be an API call
            const mockUser = {
                id: '1',
                email: email,
                username: email.split('@')[0]
            };
            login('mock-jwt-token', mockUser);
            setSuccess(true);
            toast.success('Login successful! Welcome back!');
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        }
        catch (err) {
            setError('Login failed. Please try again.');
            toast.error('Login failed. Please check your credentials.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }, children: [_jsx("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    animation: 'float 20s ease-in-out infinite'
                } }), _jsxs(motion.div, { initial: { opacity: 0, y: 50, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.6, ease: "easeOut" }, style: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }, children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2, duration: 0.5 }, style: { textAlign: 'center', marginBottom: '2rem' }, children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }, style: {
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    fontSize: '32px',
                                    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
                                }, children: "\uD83C\uDFE5" }), _jsx(motion.h1, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4, duration: 0.5 }, style: {
                                    color: '#1f2937',
                                    fontSize: '1.875rem',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem'
                                }, children: "Welcome Back" }), _jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5, duration: 0.5 }, style: { color: '#6b7280', fontSize: '1rem' }, children: "Sign in to your Health Dashboard" })] }), success && (_jsx("div", { style: {
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            color: '#166534',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            textAlign: 'center'
                        }, children: "\u2705 Login successful! Redirecting to dashboard..." })), error && (_jsx("div", { style: {
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            color: '#dc2626',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            marginBottom: '1rem',
                            fontSize: '0.875rem'
                        }, children: error })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { style: { marginBottom: '1rem' }, children: [_jsx("label", { style: {
                                            display: 'block',
                                            color: '#374151',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            marginBottom: '0.5rem'
                                        }, children: "Email Address" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, disabled: isLoading || success, style: {
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            backgroundColor: isLoading || success ? '#f9fafb' : 'white'
                                        }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Enter your email" })] }), _jsxs("div", { style: { marginBottom: '1.5rem' }, children: [_jsx("label", { style: {
                                            display: 'block',
                                            color: '#374151',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            marginBottom: '0.5rem'
                                        }, children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, disabled: isLoading || success, style: {
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '0.5rem',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            backgroundColor: isLoading || success ? '#f9fafb' : 'white'
                                        }, onFocus: (e) => e.target.style.borderColor = '#3b82f6', onBlur: (e) => e.target.style.borderColor = '#d1d5db', placeholder: "Enter your password" })] }), _jsx("button", { type: "submit", disabled: isLoading || success, style: {
                                    width: '100%',
                                    backgroundColor: isLoading || success ? '#9ca3af' : '#3b82f6',
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
                                        e.currentTarget.style.backgroundColor = '#2563eb';
                                    }
                                }, onMouseOut: (e) => {
                                    if (!isLoading && !success) {
                                        e.currentTarget.style.backgroundColor = '#3b82f6';
                                    }
                                }, children: isLoading ? 'Signing In...' : success ? '✓ Success!' : 'Sign In' })] }), _jsx("div", { style: { textAlign: 'center' }, children: _jsxs("p", { style: { color: '#6b7280', fontSize: '0.875rem' }, children: ["Don't have an account?", ' ', _jsx("button", { onClick: () => window.location.href = '/signup', disabled: isLoading || success, style: {
                                        color: isLoading || success ? '#9ca3af' : '#3b82f6',
                                        background: 'none',
                                        border: 'none',
                                        cursor: isLoading || success ? 'not-allowed' : 'pointer',
                                        fontWeight: '500',
                                        textDecoration: 'underline'
                                    }, children: "Sign up here" })] }) }), _jsxs("div", { style: {
                            marginTop: '1.5rem',
                            padding: '1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '0.5rem',
                            fontSize: '0.75rem',
                            color: '#6b7280'
                        }, children: [_jsx("strong", { children: "Demo Credentials:" }), _jsx("br", {}), "Email: demo@health.com", _jsx("br", {}), "Password: password123"] })] })] }));
};
export default LoginPage;
