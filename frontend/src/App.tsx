import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import NutritionPage from './pages/NutritionPage';
import NutritionTrackerPage from './pages/NutritionTrackerPage';
import UploadPage from './pages/UploadPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';

// Welcome Page Component (redirects to login)
const WelcomePage: React.FC = () => {
  React.useEffect(() => {
    // Automatically redirect to login
    window.location.href = '/login';
  }, []);

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
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          fontSize: '24px'
        }}>
          🏥
        </div>
        <h1 style={{ 
          color: '#1f2937', 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Health Dashboard
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1rem',
          marginBottom: '1rem'
        }}>
          Redirecting to login...
        </p>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
      </div>
    </div>
  );
};


const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Protected Routes using DashboardLayout */}
        <Route element={user ? <DashboardLayout /> : <LoginPage />}> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/nutrition" element={<NutritionTrackerPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<DashboardPage />} />
        </Route>

        {/* Fallback for unauthenticated users */}
        {!user && <Route path="*" element={<LoginPage />} />}
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
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
        }}
      />
    </AuthProvider>
  );
};

export default App;