import * as React from 'react';
import { useState } from 'react';
import { geminiService, HealthRecommendation } from '../../../services/geminiService';

const AIRecommendationsCard: React.FC = () => {
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRecommendations = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Mock user profile - in real app, this would come from user data
      const userProfile = {
        age: 28,
        gender: 'male',
        height: 175,
        weight: 70,
        activityLevel: 'moderate',
        goals: ['weight loss', 'muscle gain', 'better sleep']
      };

      const aiRecommendations = await geminiService.getHealthRecommendations(userProfile);
      setRecommendations(aiRecommendations);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nutrition': return '🍎';
      case 'exercise': return '💪';
      case 'sleep': return '😴';
      case 'mental': return '🧠';
      default: return '💡';
    }
  };

  return (
    <div className="glass-panel p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-extrabold text-gray-800 m-0">
          🤖 AI Recommendations
        </h3>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">
          🤖 Real AI Powered
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium relative z-10">
          {error}
        </div>
      )}

      {recommendations.length === 0 && !isLoading && (
        <div className="text-center p-8 text-gray-500 relative z-10 flex flex-col items-center flex-grow justify-center">
          <div className="text-5xl mb-4 opacity-50">🤖</div>
          <p className="m-0 mb-6 text-base font-medium max-w-xs leading-relaxed">
            Get personalized health recommendations powered by AI
          </p>
          <button
            onClick={generateRecommendations}
            className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Generate Recommendations
          </button>
        </div>
      )}

      {isLoading && (
        <div className="text-center p-8 text-gray-500 relative z-10 flex flex-col items-center flex-grow justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="m-0 font-medium animate-pulse">AI is analyzing your profile...</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="flex flex-col gap-3 overflow-y-auto pr-1 relative z-10 flex-grow" style={{ maxHeight: '400px' }}>
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-xl border border-white border-opacity-40 transition-all duration-300 shadow-sm hover:shadow hover:bg-opacity-80 group/rec"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mr-4 flex-shrink-0 shadow-sm transition-transform duration-300 group-hover/rec:scale-110">
                {getCategoryIcon(rec.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-bold text-gray-800 m-0 truncate pr-2">
                    {rec.title}
                  </h4>
                  <div
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm flex-shrink-0"
                    style={{ backgroundColor: getPriorityColor(rec.priority) }}
                  >
                    {rec.priority}
                  </div>
                </div>
                <p className="text-xs text-gray-600 m-0 leading-relaxed font-medium">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-4 text-center relative z-10">
          <button
            onClick={generateRecommendations}
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold transition-all border shadow-sm ${isLoading
                ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-white bg-opacity-80 text-primary-600 border-primary-100 hover:bg-primary-50 hover:border-primary-200 active:scale-95'
              }`}
          >
            🔄 Generate New Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsCard;
