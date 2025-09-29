import React from 'react';

const SimpleApp: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        margin: '1rem'
      }}>
        <h1 style={{ 
          color: '#1f2937', 
          fontSize: '2rem', 
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          🎉 Health Dashboard
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}>
          Your React + TypeScript + TailwindCSS application is working!
        </p>
        <div style={{
          backgroundColor: '#dbeafe',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#1e40af', fontWeight: 'bold' }}>
            ✅ React is loaded
          </p>
          <p style={{ color: '#1e40af', fontWeight: 'bold' }}>
            ✅ TypeScript is working
          </p>
          <p style={{ color: '#1e40af', fontWeight: 'bold' }}>
            ✅ Vite dev server is running
          </p>
        </div>
        <button 
          onClick={() => alert('Button clicked! Everything is working!')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default SimpleApp;
