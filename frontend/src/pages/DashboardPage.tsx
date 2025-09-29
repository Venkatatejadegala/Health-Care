import * as React from 'react';
import HealthMetricsCard from '../components/dashboard/cards/HealthMetricsCard';
import GoalTrackerCard from '../components/dashboard/cards/GoalTrackerCard';
import AIRecommendationsCard from '../components/dashboard/cards/AIRecommendationsCard';
import HealthInsightsCard from '../components/dashboard/cards/HealthInsightsCard';
import RecentActivityCard from '../components/dashboard/cards/RecentActivityCard';
import HealthTipsCard from '../components/dashboard/cards/HealthTipsCard';
import NutritionTrackerCard from '../components/dashboard/cards/NutritionTrackerCard';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: '#1f2937', 
          fontSize: '2rem', 
          fontWeight: 'bold',
          marginBottom: '1.5rem'
        }}>
          🏥 Health Dashboard
        </h1>
        
        {/* Main Dashboard Layout - Side by Side */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr', 
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Left Column - Main Metrics */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem'
            }}>
              <HealthMetricsCard />
              <GoalTrackerCard />
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem'
            }}>
              <RecentActivityCard />
              <HealthTipsCard />
            </div>
          </div>

          {/* Right Column - AI Recommendations */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <AIRecommendationsCard />
            <HealthInsightsCard />
          </div>
        </div>

        {/* Bottom Row - Quick Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👟</div>
            <h4 style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Steps Today
            </h4>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
              8,432
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔥</div>
            <h4 style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Calories Burned
            </h4>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
              1,247
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💧</div>
            <h4 style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Water Intake
            </h4>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#06b6d4', margin: 0 }}>
              6.2L
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
            <h4 style={{ color: '#1f2937', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
              Weekly Goal
            </h4>
            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
              75%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
