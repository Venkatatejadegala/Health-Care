import * as React from 'react';

const RecentActivityCard: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'exercise',
      title: 'Morning Run Completed',
      description: '5.2 km in 28 minutes',
      time: '2 hours ago',
      icon: '🏃‍♂️',
      color: '#3b82f6'
    },
    {
      id: 2,
      type: 'meal',
      title: 'Meal Logged',
      description: 'Grilled chicken salad',
      time: '4 hours ago',
      icon: '🍽️',
      color: '#10b981'
    },
    {
      id: 3,
      type: 'water',
      title: 'Water Intake Goal',
      description: '8 glasses completed',
      time: '6 hours ago',
      icon: '💧',
      color: '#06b6d4'
    },
    {
      id: 4,
      type: 'sleep',
      title: 'Sleep Recorded',
      description: '7.5 hours of quality sleep',
      time: 'Yesterday',
      icon: '😴',
      color: '#8b5cf6'
    }
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      height: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: 0
        }}>
          Recent Activity
        </h3>
        <button
          style={{
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem',
            color: '#6b7280',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
        >
          View All
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: activity.color,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              marginRight: '0.75rem',
              flexShrink: 0
            }}>
              {activity.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 0.25rem 0'
              }}>
                {activity.title}
              </p>
              <p style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                margin: 0
              }}>
                {activity.description}
              </p>
            </div>
            <span style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              flexShrink: 0,
              marginLeft: '0.5rem'
            }}>
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityCard;