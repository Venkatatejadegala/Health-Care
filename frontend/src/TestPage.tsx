import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Dashboard</h1>
          <p className="text-gray-600 mb-6">Your modern health tracking application is working!</p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900">✅ React + TypeScript</h3>
              <p className="text-sm text-blue-700">Successfully loaded</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900">✅ TailwindCSS</h3>
              <p className="text-sm text-green-700">Styling is working</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900">✅ Vite</h3>
              <p className="text-sm text-purple-700">Development server running</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button 
              onClick={() => window.location.href = '/simple-dashboard'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Simple Dashboard
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Full Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
