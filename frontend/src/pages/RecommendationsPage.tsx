import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { geminiService, HealthRecommendation } from '../services/geminiService';

const RecommendationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // New state for AI chat feature
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAskingAI, setIsAskingAI] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{question: string, answer: string}>>([]);
  const [apiTestResult, setApiTestResult] = useState<string>('');

  const categories = [
    { id: 'all', name: 'All', icon: '📊' },
    { id: 'nutrition', name: 'Nutrition', icon: '🍎' },
    { id: 'exercise', name: 'Exercise', icon: '💪' },
    { id: 'sleep', name: 'Sleep', icon: '😴' },
    { id: 'mental', name: 'Mental Health', icon: '🧠' },
    { id: 'general', name: 'General', icon: '💡' }
  ];

  const generateAIRecommendations = async () => {
    setIsLoading(true);
    setError('');
    setHasGenerated(false);

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
      setHasGenerated(true);
    } catch (err) {
      setError('Failed to generate AI recommendations. Please try again.');
      console.error('Error generating recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const askAIAboutFood = async () => {
    if (!userQuestion.trim()) return;
    
    setIsAskingAI(true);
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

      console.log('Starting AI request...');
      const response = await geminiService.askAboutFoodAndHealth(userQuestion, userProfile);
      console.log('AI response received:', response);
      
      setAiResponse(response);
      
      // Add to chat history
      setChatHistory(prev => [...prev, { question: userQuestion, answer: response }]);
      setUserQuestion('');
    } catch (err) {
      console.error('Error asking AI:', err);
      setError(`Failed to get AI response: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsAskingAI(false);
    }
  };

  const testAPIConnection = async () => {
    setApiTestResult('🔍 Testing API connection...');
    try {
      const isWorking = await geminiService.testConnection();
      setApiTestResult(isWorking ? '✅ API connection successful!' : '❌ API connection failed');
    } catch (err) {
      setApiTestResult(`❌ API test error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === selectedCategory);

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
      case 'general': return '💡';
      default: return '💡';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nutrition': return '#10b981';
      case 'exercise': return '#3b82f6';
      case 'sleep': return '#8b5cf6';
      case 'mental': return '#ef4444';
      case 'general': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            color: '#1f2937', 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            margin: 0
          }}>
            💡 AI Health Recommendations
          </h1>
          {!hasGenerated && !isLoading && (
            <button
              onClick={generateAIRecommendations}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              🤖 Generate AI Recommendations
            </button>
          )}
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        {isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            marginBottom: '2rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              AI is analyzing your profile...
            </h3>
            <p style={{
              color: '#6b7280',
              margin: 0
            }}>
              Generating personalized health recommendations based on your data
            </p>
          </div>
        )}

        {!hasGenerated && !isLoading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Generate Recommendations Card */}
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Get AI Recommendations
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '1.5rem'
              }}>
                Get personalized health recommendations based on your profile and goals.
              </p>
              <button
                onClick={generateAIRecommendations}
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
              >
                Generate Recommendations
              </button>
            </div>

            {/* Ask AI About Food Card */}
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>🍎</div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0
                }}>
                  Ask AI About Food & Health
                </h3>
              </div>
              
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                Ask questions about food, nutrients, health issues, and how they relate to your goals.
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask about food, nutrients, health issues... (e.g., 'What foods help with muscle gain?', 'Is quinoa good for weight loss?')"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={askAIAboutFood}
                  disabled={!userQuestion.trim() || isAskingAI}
                  style={{
                    flex: 1,
                    backgroundColor: !userQuestion.trim() || isAskingAI ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: !userQuestion.trim() || isAskingAI ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (userQuestion.trim() && !isAskingAI) {
                      e.currentTarget.style.backgroundColor = '#2563eb';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (userQuestion.trim() && !isAskingAI) {
                      e.currentTarget.style.backgroundColor = '#3b82f6';
                    }
                  }}
                >
                  {isAskingAI ? '🤖 AI is thinking...' : '🤖 Ask AI'}
                </button>
                
                <button
                  onClick={testAPIConnection}
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
                >
                  🔧 Test API
                </button>
              </div>
              
              {apiTestResult && (
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  backgroundColor: apiTestResult.includes('✅') ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${apiTestResult.includes('✅') ? '#bbf7d0' : '#fecaca'}`,
                  borderRadius: '0.375rem',
                  fontSize: '0.75rem',
                  color: apiTestResult.includes('✅') ? '#166534' : '#dc2626'
                }}>
                  {apiTestResult}
                </div>
              )}

            </div>
          </div>
        )}

        {/* AI Response Display */}
        {(aiResponse || chatHistory.length > 0) && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🤖 AI Health Expert
            </h3>

            {/* Chat History */}
            {chatHistory.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                {chatHistory.map((chat, index) => (
                  <div key={index} style={{ marginBottom: '0.75rem' }}>
                    <div style={{
                      backgroundColor: '#f8fafc',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      marginBottom: '0.25rem',
                      fontSize: '0.8rem',
                      color: '#475569',
                      border: '1px solid #e2e8f0'
                    }}>
                      <strong>Q:</strong> {chat.question}
                    </div>
                    <div style={{
                      backgroundColor: '#f0f9ff',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.8rem',
                      color: '#0c4a6e',
                      border: '1px solid #bae6fd',
                      lineHeight: '1.4'
                    }}>
                      <strong>A:</strong> {chat.answer}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Current Response */}
            {aiResponse && (
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #bbf7d0',
                fontSize: '0.8rem',
                color: '#166534',
                lineHeight: '1.4'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '1rem' }}>💡</span>
                  <strong>Expert Answer:</strong>
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Filter - Only show when we have recommendations */}
        {hasGenerated && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
                style={{
                  backgroundColor: selectedCategory === category.id ? '#3b82f6' : '#f3f4f6',
                  color: selectedCategory === category.id ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
            </button>
          ))}
        </div>
        )}

        {/* Recommendations Grid - Only show when we have generated recommendations */}
        {hasGenerated && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: getCategoryColor(rec.category),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    {getCategoryIcon(rec.category)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: 0
                      }}>
                        {rec.title}
                      </h3>
                      <div style={{
                        backgroundColor: getPriorityColor(rec.priority),
                        color: 'white',
                        padding: '0.125rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                      }}>
                        {rec.priority}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.5'
                    }}>
                      {rec.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.375rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
                      >
                        ✓ Mark as Done
                      </button>
                      <button
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                          e.currentTarget.style.borderColor = '#9ca3af';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                      >
                        📅 Schedule
                      </button>
                      <button
                        style={{
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                          e.currentTarget.style.borderColor = '#9ca3af';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                      >
                        ℹ️ Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary Stats and Regenerate Button - Only show when we have generated recommendations */}
        {hasGenerated && (
          <>
            <div style={{
              marginTop: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Total Recommendations
                </h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', margin: 0 }}>
                  {recommendations.length}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔥</div>
                <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  High Priority
                </h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
                  {recommendations.filter(r => r.priority === 'high').length}
                </p>
      </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Categories
                </h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                  {new Set(recommendations.map(r => r.category)).size}
            </p>
          </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
                <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  AI Generated
                </h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>
                  ✓
            </p>
          </div>
        </div>

            {/* Regenerate Button */}
            <div style={{
              marginTop: '2rem',
              textAlign: 'center'
            }}>
              <button
                onClick={generateAIRecommendations}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? '#9ca3af' : '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#d97706';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                  }
                }}
              >
                🔄 {isLoading ? 'Generating...' : 'Generate New Recommendations'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;