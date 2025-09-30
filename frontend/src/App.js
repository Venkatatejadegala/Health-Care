import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import NutritionTrackerPage from './pages/NutritionTrackerPage';
import UploadPage from './pages/UploadPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
// Welcome Page Component (redirects to login)
const WelcomePage = () => {
    React.useEffect(() => {
        // Automatically redirect to login
        window.location.href = '/login';
    }, []);
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif'
        }, children: _jsxs("div", { style: {
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%',
                margin: '1rem'
            }, children: [_jsx("div", { style: {
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#3b82f6',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: '24px'
                    }, children: "\uD83C\uDFE5" }), _jsx("h1", { style: {
                        color: '#1f2937',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }, children: "Health Dashboard" }), _jsx("p", { style: {
                        color: '#6b7280',
                        fontSize: '1rem',
                        marginBottom: '1rem'
                    }, children: "Redirecting to login..." }), _jsx("div", { style: {
                        width: '40px',
                        height: '40px',
                        border: '4px solid #e5e7eb',
                        borderTop: '4px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    } })] }) }));
};
const AppContent = () => {
    const { user } = useAuth();
    return (_jsx("div", { style: { minHeight: '100vh' }, children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignupPage, {}) }), _jsxs(Route, { element: user ? _jsx(DashboardLayout, {}) : _jsx(LoginPage, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/nutrition", element: _jsx(NutritionTrackerPage, {}) }), _jsx(Route, { path: "/upload", element: _jsx(UploadPage, {}) }), _jsx(Route, { path: "/recommendations", element: _jsx(RecommendationsPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "*", element: _jsx(DashboardPage, {}) })] }), !user && _jsx(Route, { path: "*", element: _jsx(LoginPage, {}) })] }) }));
};
const App = () => {
    return (_jsxs(AuthProvider, { children: [_jsx(AppContent, {}), _jsx(Toaster, { position: "top-right", toastOptions: {
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                } })] }));
};
export default App;
