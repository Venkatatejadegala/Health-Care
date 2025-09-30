import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HealthMetricsCard from '../components/dashboard/cards/HealthMetricsCard';
import GoalTrackerCard from '../components/dashboard/cards/GoalTrackerCard';
import AIRecommendationsCard from '../components/dashboard/cards/AIRecommendationsCard';
import HealthInsightsCard from '../components/dashboard/cards/HealthInsightsCard';
import RecentActivityCard from '../components/dashboard/cards/RecentActivityCard';
import HealthTipsCard from '../components/dashboard/cards/HealthTipsCard';
const DashboardPage = () => {
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }, children: _jsxs("div", { style: { maxWidth: '1200px', margin: '0 auto' }, children: [_jsx("h1", { style: {
                        color: '#1f2937',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1.5rem'
                    }, children: "\uD83C\uDFE5 Health Dashboard" }), _jsxs("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr',
                        gap: '1.5rem',
                        marginBottom: '1.5rem'
                    }, children: [_jsxs("div", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }, children: [_jsxs("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '1rem'
                                    }, children: [_jsx(HealthMetricsCard, {}), _jsx(GoalTrackerCard, {})] }), _jsxs("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '1rem'
                                    }, children: [_jsx(RecentActivityCard, {}), _jsx(HealthTipsCard, {})] })] }), _jsxs("div", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }, children: [_jsx(AIRecommendationsCard, {}), _jsx(HealthInsightsCard, {})] })] }), _jsxs("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem'
                    }, children: [_jsxs("div", { style: {
                                backgroundColor: 'white',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '1.5rem', marginBottom: '0.5rem' }, children: "\uD83D\uDC5F" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }, children: "Steps Today" }), _jsx("p", { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }, children: "8,432" })] }), _jsxs("div", { style: {
                                backgroundColor: 'white',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '1.5rem', marginBottom: '0.5rem' }, children: "\uD83D\uDD25" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }, children: "Calories Burned" }), _jsx("p", { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }, children: "1,247" })] }), _jsxs("div", { style: {
                                backgroundColor: 'white',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '1.5rem', marginBottom: '0.5rem' }, children: "\uD83D\uDCA7" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }, children: "Water Intake" }), _jsx("p", { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#06b6d4', margin: 0 }, children: "6.2L" })] }), _jsxs("div", { style: {
                                backgroundColor: 'white',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                textAlign: 'center'
                            }, children: [_jsx("div", { style: { fontSize: '1.5rem', marginBottom: '0.5rem' }, children: "\uD83C\uDFAF" }), _jsx("h4", { style: { color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }, children: "Weekly Goal" }), _jsx("p", { style: { fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', margin: 0 }, children: "75%" })] })] })] }) }));
};
export default DashboardPage;
