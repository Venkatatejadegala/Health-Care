import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Sidebar = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('dashboard');
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
        { id: 'nutrition', label: 'Meal Tracker', icon: '🍎', path: '/nutrition' },
        { id: 'upload', label: 'Upload Image', icon: '📷', path: '/upload' },
        { id: 'recommendations', label: 'Recommendations', icon: '💡', path: '/recommendations' },
        { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
    ];
    const handleItemClick = (item) => {
        setActiveItem(item.id);
        navigate(item.path);
        onClose(); // Always close sidebar after navigation
    };
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    // Update active item based on current location
    React.useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = menuItems.find(item => item.path === currentPath);
        if (currentItem) {
            setActiveItem(currentItem.id);
        }
    }, [location.pathname]);
    return (_jsxs(_Fragment, { children: [isOpen && (_jsx("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 40,
                    display: 'block'
                }, onClick: onClose })), _jsxs("div", { style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    width: '280px',
                    backgroundColor: 'white',
                    borderRight: '1px solid #e5e7eb',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }, children: [_jsxs("div", { style: {
                            padding: '1.5rem',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("div", { style: {
                                            width: '40px',
                                            height: '40px',
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '20px',
                                            marginRight: '0.75rem'
                                        }, children: "\uD83C\uDFE5" }), _jsxs("div", { children: [_jsx("h2", { style: {
                                                    fontSize: '1.25rem',
                                                    fontWeight: 'bold',
                                                    color: '#1f2937',
                                                    margin: 0
                                                }, children: "Health Dashboard" }), _jsx("p", { style: {
                                                    fontSize: '0.75rem',
                                                    color: '#6b7280',
                                                    margin: 0
                                                }, children: "Wellness Tracker" })] })] }), _jsx("button", { onClick: onClose, style: {
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#6b7280',
                                    padding: '0.25rem'
                                }, children: "\u00D7" })] }), _jsx("div", { style: {
                            padding: '1.5rem',
                            borderBottom: '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb'
                        }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("div", { style: {
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: '#10b981',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.25rem',
                                        color: 'white',
                                        marginRight: '0.75rem'
                                    }, children: user?.username?.charAt(0).toUpperCase() || 'U' }), _jsxs("div", { children: [_jsx("p", { style: {
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#1f2937',
                                                margin: 0
                                            }, children: user?.username || 'User' }), _jsx("p", { style: {
                                                fontSize: '0.875rem',
                                                color: '#6b7280',
                                                margin: 0
                                            }, children: user?.email || 'user@example.com' })] })] }) }), _jsx("nav", { style: { flex: 1, padding: '1rem 0' }, children: _jsx("ul", { style: { listStyle: 'none', padding: 0, margin: 0 }, children: menuItems.map((item) => (_jsx("li", { style: { marginBottom: '0.25rem' }, children: _jsxs("button", { onClick: () => handleItemClick(item), style: {
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: activeItem === item.id ? '#eff6ff' : 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        color: activeItem === item.id ? '#1d4ed8' : '#374151',
                                        fontWeight: activeItem === item.id ? '600' : '500',
                                        transition: 'all 0.2s',
                                        textAlign: 'left'
                                    }, onMouseOver: (e) => {
                                        if (activeItem !== item.id) {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                        }
                                    }, onMouseOut: (e) => {
                                        if (activeItem !== item.id) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }, children: [_jsx("span", { style: { fontSize: '1.25rem', marginRight: '0.75rem' }, children: item.icon }), item.label] }) }, item.id))) }) }), _jsx("div", { style: {
                            padding: '1.5rem',
                            borderTop: '1px solid #e5e7eb',
                            backgroundColor: '#f9fafb'
                        }, children: _jsxs("button", { onClick: handleLogout, style: {
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.75rem 1rem',
                                backgroundColor: '#fef2f2',
                                border: '1px solid #fecaca',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                color: '#dc2626',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }, onMouseOver: (e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                            }, onMouseOut: (e) => {
                                e.currentTarget.style.backgroundColor = '#fef2f2';
                            }, children: [_jsx("span", { style: { fontSize: '1rem', marginRight: '0.5rem' }, children: "\uD83D\uDEAA" }), "Sign Out"] }) })] })] }));
};
export default Sidebar;
