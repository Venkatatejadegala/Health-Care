import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setAnalysisResult(null);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult = {
        foodName: 'Grilled Chicken Breast with Vegetables',
        confidence: 0.92,
        nutrition: {
          calories: 285,
          protein: 35,
          carbs: 8,
          fat: 12,
          fiber: 3,
          sodium: 180
        },
        servingSize: '1 serving (200g)',
        description: 'Lean protein with mixed vegetables, perfect for a healthy meal',
        healthBenefits: [
          'High protein content for muscle building',
          'Low in saturated fat',
          'Good source of vitamins and minerals',
          'Supports weight management'
        ],
        recommendations: [
          'Great choice for post-workout meal',
          'Consider adding a complex carb like brown rice',
          'Perfect portion size for most adults'
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

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
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          📷 Food Image Analysis
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Upload Food Image
            </h2>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                border: `2px dashed ${dragActive ? '#3b82f6' : '#d1d5db'}`,
                borderRadius: '0.75rem',
                padding: '3rem 2rem',
                textAlign: 'center',
                backgroundColor: dragActive ? '#eff6ff' : '#f9fafb',
                transition: 'all 0.2s',
                cursor: 'pointer',
                marginBottom: '1.5rem'
              }}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                {dragActive ? 'Drop your image here' : 'Drag & drop your food image here'}
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1rem'
              }}>
                or click to browse files
              </p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                style={{ display: 'none' }}
              />
              <button
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Choose File
              </button>
            </div>

            {selectedFile && (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>✅</div>
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#166534',
                      margin: 0
                    }}>
                      {selectedFile.name}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#166534',
                      margin: 0
                    }}>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={analyzeImage}
              disabled={!selectedFile || isAnalyzing}
              style={{
                width: '100%',
                backgroundColor: selectedFile && !isAnalyzing ? '#10b981' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: selectedFile && !isAnalyzing ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s'
              }}
            >
              {isAnalyzing ? '🤖 Analyzing...' : '🔍 Analyze Food'}
            </button>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Analysis Results
            </h2>

            {isAnalyzing && (
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem'
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
                <p style={{
                  fontSize: '1.125rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  AI is analyzing your food image...
                </p>
              </div>
            )}

            {analysisResult && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {/* Food Name */}
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    {analysisResult.foodName}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {Math.round(analysisResult.confidence * 100)}% confident
                    </span>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      {analysisResult.servingSize}
                    </span>
                  </div>
                </div>

                {/* Nutrition Info */}
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    Nutritional Information
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Calories:</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                        {analysisResult.nutrition.calories}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Protein:</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                        {analysisResult.nutrition.protein}g
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Carbs:</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                        {analysisResult.nutrition.carbs}g
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Fat:</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                        {analysisResult.nutrition.fat}g
                      </span>
                    </div>
                  </div>
                </div>

                {/* Health Benefits */}
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    Health Benefits
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {analysisResult.healthBenefits.map((benefit: string, index: number) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#374151'
                      }}>
                        <span style={{ color: '#10b981' }}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.75rem'
                  }}>
                    Recommendations
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#374151'
                      }}>
                        <span style={{ color: '#3b82f6' }}>💡</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  style={{
                    width: '100%',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  + Add to Nutrition Log
                </button>
              </div>
            )}

            {!analysisResult && !isAnalyzing && (
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
                <p style={{ margin: 0 }}>
                  Upload a food image to get AI-powered nutritional analysis
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
