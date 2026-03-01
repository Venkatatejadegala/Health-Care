import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
const UploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setAnalysisResult(null);
        }
        else {
            alert('Please select a valid image file');
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };
    const analyzeImage = async () => {
        if (!selectedFile)
            return;
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
    return (_jsx("div", { style: {
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }, children: _jsxs("div", { style: { maxWidth: '1200px', margin: '0 auto' }, children: [_jsx("h1", { style: {
                        color: '#1f2937',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '2rem',
                        textAlign: 'center'
                    }, children: "\uD83D\uDCF7 Food Image Analysis" }), _jsxs("div", { style: {
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '2rem',
                        alignItems: 'start'
                    }, children: [_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, style: {
                                backgroundColor: 'white',
                                borderRadius: '0.75rem',
                                padding: '2rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb'
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#1f2937',
                                        marginBottom: '1rem'
                                    }, children: "Upload Food Image" }), _jsxs("div", { onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, style: {
                                        border: `2px dashed ${dragActive ? '#3b82f6' : '#d1d5db'}`,
                                        borderRadius: '0.75rem',
                                        padding: '3rem 2rem',
                                        textAlign: 'center',
                                        backgroundColor: dragActive ? '#eff6ff' : '#f9fafb',
                                        transition: 'all 0.2s',
                                        cursor: 'pointer',
                                        marginBottom: '1.5rem'
                                    }, onClick: () => document.getElementById('fileInput')?.click(), children: [_jsx("div", { style: { fontSize: '3rem', marginBottom: '1rem' }, children: "\uD83D\uDCF8" }), _jsx("p", { style: {
                                                fontSize: '1.125rem',
                                                fontWeight: '500',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }, children: dragActive ? 'Drop your image here' : 'Drag & drop your food image here' }), _jsx("p", { style: {
                                                fontSize: '0.875rem',
                                                color: '#6b7280',
                                                marginBottom: '1rem'
                                            }, children: "or click to browse files" }), _jsx("input", { id: "fileInput", type: "file", accept: "image/*", onChange: (e) => {
                                                const file = e.target.files?.[0];
                                                if (file)
                                                    handleFileSelect(file);
                                            }, style: { display: 'none' } }), _jsx("button", { style: {
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                padding: '0.75rem 1.5rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: 'pointer'
                                            }, children: "Choose File" })] }), selectedFile && (_jsx("div", { style: {
                                        backgroundColor: '#f0fdf4',
                                        border: '1px solid #bbf7d0',
                                        borderRadius: '0.5rem',
                                        padding: '1rem',
                                        marginBottom: '1.5rem'
                                    }, children: _jsxs("div", { style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }, children: [_jsx("div", { style: { fontSize: '1.5rem' }, children: "\u2705" }), _jsxs("div", { children: [_jsx("p", { style: {
                                                            fontSize: '0.875rem',
                                                            fontWeight: '500',
                                                            color: '#166534',
                                                            margin: 0
                                                        }, children: selectedFile.name }), _jsxs("p", { style: {
                                                            fontSize: '0.75rem',
                                                            color: '#166534',
                                                            margin: 0
                                                        }, children: [(selectedFile.size / 1024 / 1024).toFixed(2), " MB"] })] })] }) })), _jsx("button", { onClick: analyzeImage, disabled: !selectedFile || isAnalyzing, style: {
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
                                    }, children: isAnalyzing ? '🤖 Analyzing...' : '🔍 Analyze Food' })] }), _jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 }, style: {
                                backgroundColor: 'white',
                                borderRadius: '0.75rem',
                                padding: '2rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb'
                            }, children: [_jsx("h2", { style: {
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#1f2937',
                                        marginBottom: '1rem'
                                    }, children: "Analysis Results" }), isAnalyzing && (_jsxs("div", { style: {
                                        textAlign: 'center',
                                        padding: '3rem 2rem'
                                    }, children: [_jsx("div", { style: {
                                                width: '60px',
                                                height: '60px',
                                                border: '4px solid #e5e7eb',
                                                borderTop: '4px solid #3b82f6',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite',
                                                margin: '0 auto 1rem'
                                            } }), _jsx("p", { style: {
                                                fontSize: '1.125rem',
                                                color: '#6b7280',
                                                margin: 0
                                            }, children: "AI is analyzing your food image..." })] })), analysisResult && (_jsxs("div", { style: {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem'
                                    }, children: [_jsxs("div", { children: [_jsx("h3", { style: {
                                                        fontSize: '1.25rem',
                                                        fontWeight: 'bold',
                                                        color: '#1f2937',
                                                        marginBottom: '0.5rem'
                                                    }, children: analysisResult.foodName }), _jsxs("div", { style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }, children: [_jsxs("span", { style: {
                                                                backgroundColor: '#10b981',
                                                                color: 'white',
                                                                padding: '0.25rem 0.75rem',
                                                                borderRadius: '9999px',
                                                                fontSize: '0.75rem',
                                                                fontWeight: '500'
                                                            }, children: [Math.round(analysisResult.confidence * 100), "% confident"] }), _jsx("span", { style: {
                                                                fontSize: '0.875rem',
                                                                color: '#6b7280'
                                                            }, children: analysisResult.servingSize })] })] }), _jsxs("div", { children: [_jsx("h4", { style: {
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        marginBottom: '0.75rem'
                                                    }, children: "Nutritional Information" }), _jsxs("div", { style: {
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                                        gap: '0.5rem'
                                                    }, children: [_jsxs("div", { style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                padding: '0.5rem',
                                                                backgroundColor: '#f9fafb',
                                                                borderRadius: '0.375rem'
                                                            }, children: [_jsx("span", { style: { fontSize: '0.875rem', color: '#6b7280' }, children: "Calories:" }), _jsx("span", { style: { fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }, children: analysisResult.nutrition.calories })] }), _jsxs("div", { style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                padding: '0.5rem',
                                                                backgroundColor: '#f9fafb',
                                                                borderRadius: '0.375rem'
                                                            }, children: [_jsx("span", { style: { fontSize: '0.875rem', color: '#6b7280' }, children: "Protein:" }), _jsxs("span", { style: { fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }, children: [analysisResult.nutrition.protein, "g"] })] }), _jsxs("div", { style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                padding: '0.5rem',
                                                                backgroundColor: '#f9fafb',
                                                                borderRadius: '0.375rem'
                                                            }, children: [_jsx("span", { style: { fontSize: '0.875rem', color: '#6b7280' }, children: "Carbs:" }), _jsxs("span", { style: { fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }, children: [analysisResult.nutrition.carbs, "g"] })] }), _jsxs("div", { style: {
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                padding: '0.5rem',
                                                                backgroundColor: '#f9fafb',
                                                                borderRadius: '0.375rem'
                                                            }, children: [_jsx("span", { style: { fontSize: '0.875rem', color: '#6b7280' }, children: "Fat:" }), _jsxs("span", { style: { fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }, children: [analysisResult.nutrition.fat, "g"] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { style: {
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        marginBottom: '0.75rem'
                                                    }, children: "Health Benefits" }), _jsx("ul", { style: {
                                                        listStyle: 'none',
                                                        padding: 0,
                                                        margin: 0
                                                    }, children: analysisResult.healthBenefits.map((benefit, index) => (_jsxs("li", { style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            marginBottom: '0.5rem',
                                                            fontSize: '0.875rem',
                                                            color: '#374151'
                                                        }, children: [_jsx("span", { style: { color: '#10b981' }, children: "\u2713" }), benefit] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { style: {
                                                        fontSize: '1rem',
                                                        fontWeight: '600',
                                                        color: '#1f2937',
                                                        marginBottom: '0.75rem'
                                                    }, children: "Recommendations" }), _jsx("ul", { style: {
                                                        listStyle: 'none',
                                                        padding: 0,
                                                        margin: 0
                                                    }, children: analysisResult.recommendations.map((rec, index) => (_jsxs("li", { style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            marginBottom: '0.5rem',
                                                            fontSize: '0.875rem',
                                                            color: '#374151'
                                                        }, children: [_jsx("span", { style: { color: '#3b82f6' }, children: "\uD83D\uDCA1" }), rec] }, index))) })] }), _jsx("button", { style: {
                                                width: '100%',
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                padding: '0.75rem',
                                                fontSize: '0.875rem',
                                                fontWeight: '500',
                                                cursor: 'pointer'
                                            }, children: "+ Add to Nutrition Log" })] })), !analysisResult && !isAnalyzing && (_jsxs("div", { style: {
                                        textAlign: 'center',
                                        padding: '3rem 2rem',
                                        color: '#6b7280'
                                    }, children: [_jsx("div", { style: { fontSize: '3rem', marginBottom: '1rem' }, children: "\uD83E\uDD16" }), _jsx("p", { style: { margin: 0 }, children: "Upload a food image to get AI-powered nutritional analysis" })] }))] })] })] }) }));
};
export default UploadPage;
