import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            fontFamily: 'Arial, sans-serif'
        }, children: [_jsxs("header", { style: {
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e5e7eb',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 30,
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("button", { onClick: () => setSidebarOpen(true), style: {
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#374151',
                                    padding: '0.5rem',
                                    marginRight: '1rem',
                                    borderRadius: '0.375rem',
                                    transition: 'background-color 0.2s'
                                }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#f3f4f6', onMouseOut: (e) => e.currentTarget.style.backgroundColor = 'transparent', children: "\u2630" }), _jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("div", { style: {
                                            width: '32px',
                                            height: '32px',
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '0.375rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '16px',
                                            marginRight: '0.75rem'
                                        }, children: "\uD83C\uDFE5" }), _jsx("h1", { style: {
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            margin: 0
                                        }, children: "Health Dashboard" })] })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '1rem' }, children: [_jsx("button", { style: {
                                    backgroundColor: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '1.25rem',
                                    transition: 'background-color 0.2s'
                                }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#e5e7eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#f3f4f6', children: "\uD83C\uDF19" }), _jsxs("button", { style: {
                                    backgroundColor: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '1.25rem',
                                    position: 'relative',
                                    transition: 'background-color 0.2s'
                                }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#e5e7eb', onMouseOut: (e) => e.currentTarget.style.backgroundColor = '#f3f4f6', children: ["\uD83D\uDD14", _jsx("span", { style: {
                                            position: 'absolute',
                                            top: '0.25rem',
                                            right: '0.25rem',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '16px',
                                            height: '16px',
                                            fontSize: '0.75rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }, children: "3" })] }), _jsxs("div", { style: { position: 'relative' }, children: [_jsx("div", { onClick: () => setProfileDropdownOpen(!profileDropdownOpen), style: {
                                            width: '40px',
                                            height: '40px',
                                            backgroundColor: '#10b981',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s'
                                        }, onMouseOver: (e) => e.currentTarget.style.transform = 'scale(1.05)', onMouseOut: (e) => e.currentTarget.style.transform = 'scale(1)', children: user?.username?.charAt(0).toUpperCase() || 'U' }), profileDropdownOpen && (_jsxs("div", { style: {
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            marginTop: '0.5rem',
                                            backgroundColor: 'white',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                                            border: '1px solid #e5e7eb',
                                            minWidth: '200px',
                                            zIndex: 50
                                        }, children: [_jsxs("div", { style: {
                                                    padding: '1rem',
                                                    borderBottom: '1px solid #e5e7eb'
                                                }, children: [_jsx("p", { style: {
                                                            fontSize: '0.875rem',
                                                            fontWeight: '600',
                                                            color: '#1f2937',
                                                            margin: '0 0 0.25rem 0'
                                                        }, children: user?.username || 'User' }), _jsx("p", { style: {
                                                            fontSize: '0.75rem',
                                                            color: '#6b7280',
                                                            margin: 0
                                                        }, children: user?.email || 'user@example.com' })] }), _jsxs("div", { style: { padding: '0.5rem' }, children: [_jsxs("button", { onClick: () => {
                                                            navigate('/profile');
                                                            setProfileDropdownOpen(false);
                                                        }, style: {
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem 0.75rem',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            borderRadius: '0.375rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.875rem',
                                                            color: '#374151',
                                                            textAlign: 'left',
                                                            transition: 'background-color 0.2s'
                                                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#f3f4f6', onMouseOut: (e) => e.currentTarget.style.backgroundColor = 'transparent', children: [_jsx("span", { children: "\uD83D\uDC64" }), _jsx("span", { children: "Profile" })] }), _jsxs("button", { onClick: () => {
                                                            navigate('/settings');
                                                            setProfileDropdownOpen(false);
                                                        }, style: {
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem 0.75rem',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            borderRadius: '0.375rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.875rem',
                                                            color: '#374151',
                                                            textAlign: 'left',
                                                            transition: 'background-color 0.2s'
                                                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#f3f4f6', onMouseOut: (e) => e.currentTarget.style.backgroundColor = 'transparent', children: [_jsx("span", { children: "\u2699\uFE0F" }), _jsx("span", { children: "Settings" })] }), _jsxs("button", { onClick: () => {
                                                            logout();
                                                            navigate('/login');
                                                            setProfileDropdownOpen(false);
                                                        }, style: {
                                                            width: '100%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            padding: '0.5rem 0.75rem',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            borderRadius: '0.375rem',
                                                            cursor: 'pointer',
                                                            fontSize: '0.875rem',
                                                            color: '#ef4444',
                                                            textAlign: 'left',
                                                            transition: 'background-color 0.2s'
                                                        }, onMouseOver: (e) => e.currentTarget.style.backgroundColor = '#fef2f2', onMouseOut: (e) => e.currentTarget.style.backgroundColor = 'transparent', children: [_jsx("span", { children: "\uD83D\uDEAA" }), _jsx("span", { children: "Sign Out" })] })] })] }))] })] })] }), _jsx(Sidebar, { isOpen: sidebarOpen, onClose: () => setSidebarOpen(false) }), _jsx("main", { style: {
                    padding: '2rem',
                    marginLeft: '0',
                    transition: 'margin-left 0.3s ease-in-out'
                }, children: _jsx(Outlet, {}) }), profileDropdownOpen && (_jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 40
                }, onClick: () => setProfileDropdownOpen(false) }))] }));
};
export default DashboardLayout;
