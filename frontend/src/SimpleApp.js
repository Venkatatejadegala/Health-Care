import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SimpleApp = () => {
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
            }, children: [_jsx("h1", { style: {
                        color: '#1f2937',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '1rem'
                    }, children: "\uD83C\uDF89 Health Dashboard" }), _jsx("p", { style: {
                        color: '#6b7280',
                        fontSize: '1.1rem',
                        marginBottom: '2rem'
                    }, children: "Your React + TypeScript + TailwindCSS application is working!" }), _jsxs("div", { style: {
                        backgroundColor: '#dbeafe',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        marginBottom: '1rem'
                    }, children: [_jsx("p", { style: { color: '#1e40af', fontWeight: 'bold' }, children: "\u2705 React is loaded" }), _jsx("p", { style: { color: '#1e40af', fontWeight: 'bold' }, children: "\u2705 TypeScript is working" }), _jsx("p", { style: { color: '#1e40af', fontWeight: 'bold' }, children: "\u2705 Vite dev server is running" })] }), _jsx("button", { onClick: () => alert('Button clicked! Everything is working!'), style: {
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%'
                    }, children: "Test Button" })] }) }));
};
export default SimpleApp;
