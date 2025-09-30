import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: user?.email || 'demo@health.com',
        username: user?.username || 'johndoe',
        age: 28,
        gender: 'male',
        height: 175,
        weight: 70,
        activityLevel: 'moderate',
        goals: ['weight loss', 'muscle gain', 'better sleep'],
        bio: 'Health enthusiast focused on sustainable lifestyle changes and personal growth.',
        joinDate: '2024-01-15'
    });
    const [healthStats, setHealthStats] = useState({
        totalWorkouts: 45,
        totalSteps: 125000,
        totalCaloriesBurned: 8500,
        streakDays: 12,
        achievements: 8,
        goalsCompleted: 15
    });
    const tabs = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'health', label: 'Health Stats', icon: '📊' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'achievements', label: 'Achievements', icon: '🏆' }
    ];
    const achievements = [
        { id: 1, title: 'First Week Complete', description: 'Completed your first week of tracking', icon: '🎉', date: '2024-01-22', earned: true },
        { id: 2, title: 'Hydration Master', description: 'Drank 8+ glasses of water for 7 days straight', icon: '💧', date: '2024-01-25', earned: true },
        { id: 3, title: 'Step Counter', description: 'Walked 10,000+ steps for 5 consecutive days', icon: '👟', date: '2024-01-28', earned: true },
        { id: 4, title: 'Nutrition Expert', description: 'Logged meals for 30 days', icon: '🍎', date: null, earned: false },
        { id: 5, title: 'Sleep Champion', description: 'Maintained 8+ hours sleep for 2 weeks', icon: '😴', date: null, earned: false },
        { id: 6, title: 'Goal Crusher', description: 'Completed 10 health goals', icon: '🎯', date: null, earned: false }
    ];
    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    const handleSaveProfile = () => {
        alert('Profile saved successfully!');
    };
    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }, children: _jsxs("div", { style: { maxWidth: '1200px', margin: '0 auto' }, children: [_jsx("h1", { style: {
                        color: '#1f2937',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }, children: "\uD83D\uDC64 User Profile" }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb',
                        marginBottom: '2rem'
                    }, children: _jsxs("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem'
                        }, children: [_jsx("div", { style: {
                                    width: '120px',
                                    height: '120px',
                                    backgroundColor: '#10b981',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }, children: profileData.firstName.charAt(0).toUpperCase() }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs("h2", { style: {
                                            fontSize: '2rem',
                                            fontWeight: 'bold',
                                            color: '#1f2937',
                                            margin: '0 0 0.5rem 0'
                                        }, children: [profileData.firstName, " ", profileData.lastName] }), _jsx("p", { style: {
                                            fontSize: '1.125rem',
                                            color: '#6b7280',
                                            margin: '0 0 1rem 0'
                                        }, children: profileData.bio }), _jsxs("div", { style: {
                                            display: 'flex',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }, children: [_jsxs("span", { style: {
                                                    backgroundColor: '#f3f4f6',
                                                    color: '#374151',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.875rem'
                                                }, children: ["Member since ", new Date(profileData.joinDate).toLocaleDateString()] }), _jsxs("span", { style: {
                                                    backgroundColor: '#f3f4f6',
                                                    color: '#374151',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.875rem'
                                                }, children: [profileData.activityLevel, " activity level"] })] })] })] }) }), _jsx("div", { style: {
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        overflowX: 'auto',
                        paddingBottom: '0.5rem'
                    }, children: tabs.map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), style: {
                            backgroundColor: activeTab === tab.id ? '#3b82f6' : '#f3f4f6',
                            color: activeTab === tab.id ? 'white' : '#374151',
                            border: 'none',
                            borderRadius: '0.5rem',
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
                            if (activeTab !== tab.id) {
                                e.currentTarget.style.backgroundColor = '#e5e7eb';
                            }
                        }, onMouseOut: (e) => {
                            if (activeTab !== tab.id) {
                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                            }
                        }, children: [_jsx("span", { children: tab.icon }), _jsx("span", { children: tab.label })] }, tab.id))) }), activeTab === 'profile' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }, children: [_jsx("h3", { style: {
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '1.5rem'
                            }, children: "Personal Information" }), _jsxs("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1.5rem'
                            }, children: [_jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: "First Name" }), _jsx("input", { type: "text", value: profileData.firstName, onChange: (e) => handleInputChange('firstName', e.target.value), style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem'
                                            } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: "Last Name" }), _jsx("input", { type: "text", value: profileData.lastName, onChange: (e) => handleInputChange('lastName', e.target.value), style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem'
                                            } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: "Email" }), _jsx("input", { type: "email", value: profileData.email, onChange: (e) => handleInputChange('email', e.target.value), style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem'
                                            } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: "Age" }), _jsx("input", { type: "number", value: profileData.age, onChange: (e) => handleInputChange('age', parseInt(e.target.value)), style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem'
                                            } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: "Height (cm)" }), _jsx("input", { type: "number", value: profileData.height, onChange: (e) => handleInputChange('height', parseInt(e.target.value)), style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem'
                                            } })] }), _jsxs("div", { children: [_jsx("label", { style: {
                                                display: 'block',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: "Weight (kg)" }), _jsx("input", { type: "number", value: profileData.weight, onChange: (e) => handleInputChange('weight', parseInt(e.target.value)), style: {
                                                width: '100%',
                                                padding: '0.75rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                fontSize: '1rem'
                                            } })] })] }), _jsxs("div", { style: { marginTop: '1.5rem' }, children: [_jsx("label", { style: {
                                        display: 'block',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        color: '#374151',
                                        marginBottom: '0.5rem'
                                    }, children: "Bio" }), _jsx("textarea", { value: profileData.bio, onChange: (e) => handleInputChange('bio', e.target.value), rows: 3, style: {
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.5rem',
                                        fontSize: '1rem',
                                        resize: 'vertical'
                                    } })] }), _jsxs("div", { style: {
                                display: 'flex',
                                gap: '1rem',
                                marginTop: '2rem'
                            }, children: [_jsx("button", { onClick: handleSaveProfile, style: {
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }, children: "Save Changes" }), _jsx("button", { onClick: handleLogout, style: {
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        cursor: 'pointer'
                                    }, children: "Sign Out" })] })] })), activeTab === 'health' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }, children: [_jsx("h3", { style: {
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '1.5rem'
                            }, children: "Health Statistics" }), _jsxs("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1.5rem'
                            }, children: [_jsxs("div", { style: {
                                        backgroundColor: '#f9fafb',
                                        padding: '1.5rem',
                                        borderRadius: '0.5rem',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83C\uDFCB\uFE0F" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Total Workouts" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }, children: healthStats.totalWorkouts })] }), _jsxs("div", { style: {
                                        backgroundColor: '#f9fafb',
                                        padding: '1.5rem',
                                        borderRadius: '0.5rem',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDC5F" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Total Steps" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }, children: healthStats.totalSteps.toLocaleString() })] }), _jsxs("div", { style: {
                                        backgroundColor: '#f9fafb',
                                        padding: '1.5rem',
                                        borderRadius: '0.5rem',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDD25" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Calories Burned" }), _jsx("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }, children: healthStats.totalCaloriesBurned.toLocaleString() })] }), _jsxs("div", { style: {
                                        backgroundColor: '#f9fafb',
                                        padding: '1.5rem',
                                        borderRadius: '0.5rem',
                                        textAlign: 'center'
                                    }, children: [_jsx("div", { style: { fontSize: '2rem', marginBottom: '0.5rem' }, children: "\uD83D\uDD25" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }, children: "Current Streak" }), _jsxs("p", { style: { fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', margin: 0 }, children: [healthStats.streakDays, " days"] })] })] })] })), activeTab === 'achievements' && (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, style: {
                        backgroundColor: 'white',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #e5e7eb'
                    }, children: [_jsx("h3", { style: {
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                marginBottom: '1.5rem'
                            }, children: "Achievements" }), _jsx("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1rem'
                            }, children: achievements.map((achievement) => (_jsx("div", { style: {
                                    backgroundColor: achievement.earned ? '#f0fdf4' : '#f9fafb',
                                    border: `1px solid ${achievement.earned ? '#bbf7d0' : '#e5e7eb'}`,
                                    borderRadius: '0.5rem',
                                    padding: '1rem',
                                    opacity: achievement.earned ? 1 : 0.6
                                }, children: _jsxs("div", { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }, children: [_jsx("div", { style: {
                                                fontSize: '2rem',
                                                opacity: achievement.earned ? 1 : 0.3
                                            }, children: achievement.icon }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("h4", { style: {
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        margin: '0 0 0.25rem 0'
                                                    }, children: achievement.title }), _jsx("p", { style: {
                                                        fontSize: '0.875rem',
                                                        color: '#6b7280',
                                                        margin: '0 0 0.5rem 0'
                                                    }, children: achievement.description }), achievement.earned && achievement.date && (_jsxs("p", { style: {
                                                        fontSize: '0.75rem',
                                                        color: '#10b981',
                                                        margin: 0
                                                    }, children: ["Earned on ", new Date(achievement.date).toLocaleDateString()] }))] })] }) }, achievement.id))) })] }))] }) }));
};
export default ProfilePage;
