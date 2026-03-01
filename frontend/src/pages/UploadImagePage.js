import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, X, CheckCircle, Zap } from 'lucide-react';
const UploadImagePage = () => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const fileInputRef = useRef(null);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };
    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result);
                analyzeImage(file);
            };
            reader.readAsDataURL(file);
        }
    };
    const analyzeImage = async (file) => {
        setIsAnalyzing(true);
        // Simulate API call
        setTimeout(() => {
            setAnalysisResult({
                foodItems: [
                    { name: 'Grilled Chicken Breast', confidence: 95, calories: 165, protein: 31 },
                    { name: 'Steamed Broccoli', confidence: 88, calories: 35, protein: 3 },
                    { name: 'Brown Rice', confidence: 92, calories: 216, protein: 5 }
                ],
                totalCalories: 416,
                nutritionScore: 8.5,
                recommendations: [
                    'Great protein content!',
                    'Consider adding more vegetables',
                    'Portion size looks appropriate'
                ]
            });
            setIsAnalyzing(false);
        }, 3000);
    };
    const removeImage = () => {
        setUploadedImage(null);
        setAnalysisResult(null);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Food Image Analysis" }), _jsx("p", { className: "text-gray-600 mt-1", children: "Upload a photo of your meal to get instant nutrition analysis" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Upload Image" }), !uploadedImage ? (_jsx("div", { className: `border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'}`, onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center", children: _jsx(Upload, { className: "w-8 h-8 text-blue-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Drop your image here" }), _jsx("p", { className: "text-gray-500", children: "or click to browse files" })] }), _jsx("button", { onClick: () => fileInputRef.current?.click(), className: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors", children: "Choose File" }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: (e) => e.target.files?.[0] && handleFile(e.target.files[0]), className: "hidden" })] }) })) : (_jsxs("div", { className: "relative", children: [_jsx("img", { src: uploadedImage, alt: "Uploaded food", className: "w-full h-64 object-cover rounded-lg" }), _jsx("button", { onClick: removeImage, className: "absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors", children: _jsx(X, { className: "w-4 h-4" }) })] }))] }), _jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Actions" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx(Camera, { className: "w-5 h-5 text-blue-600" }), _jsx("span", { className: "font-medium", children: "Take Photo" })] }), _jsxs("button", { className: "flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors", children: [_jsx(ImageIcon, { className: "w-5 h-5 text-green-600" }), _jsx("span", { className: "font-medium", children: "From Gallery" })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-4", children: "Analysis Results" }), isAnalyzing ? (_jsxs("div", { className: "text-center py-8", children: [_jsxs("div", { className: "inline-flex items-center space-x-3", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }), _jsx("span", { className: "text-gray-600", children: "Analyzing your image..." })] }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "This may take a few seconds" })] })) : analysisResult ? (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Nutrition Score" }), _jsx("p", { className: "text-sm text-gray-600", children: "Overall meal quality" })] }), _jsxs("div", { className: "text-3xl font-bold text-green-600", children: [analysisResult.nutritionScore, "/10"] })] }) }), _jsx("div", { className: "bg-blue-50 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Total Calories" }), _jsx("p", { className: "text-sm text-gray-600", children: "Estimated from image" })] }), _jsxs("div", { className: "text-2xl font-bold text-blue-600", children: [analysisResult.totalCalories, " cal"] })] }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Detected Foods" }), _jsx("div", { className: "space-y-3", children: analysisResult.foodItems.map((food, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "w-4 h-4 text-green-600" }) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-gray-900", children: food.name }), _jsxs("div", { className: "text-sm text-gray-500", children: [food.confidence, "% confidence"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-semibold text-gray-900", children: [food.calories, " cal"] }), _jsxs("div", { className: "text-sm text-gray-500", children: [food.protein, "g protein"] })] })] }, index))) })] })] })) : (_jsxs("div", { className: "text-center py-8 text-gray-500", children: [_jsx(ImageIcon, { className: "w-12 h-12 mx-auto mb-4 text-gray-300" }), _jsx("p", { children: "Upload an image to see analysis results" })] }))] }), analysisResult && (_jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Recommendations" }), _jsx("div", { className: "space-y-3", children: analysisResult.recommendations.map((rec, index) => (_jsxs("div", { className: "flex items-start space-x-3 p-3 bg-blue-50 rounded-lg", children: [_jsx(Zap, { className: "w-5 h-5 text-blue-600 mt-0.5" }), _jsx("span", { className: "text-sm text-gray-700", children: rec })] }, index))) })] }))] })] }), _jsxs("div", { className: "bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Tips for Better Analysis" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-blue-600 font-semibold text-sm", children: "1" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900", children: "Good Lighting" }), _jsx("p", { className: "text-sm text-gray-600", children: "Ensure your food is well-lit for better recognition" })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-blue-600 font-semibold text-sm", children: "2" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900", children: "Clear View" }), _jsx("p", { className: "text-sm text-gray-600", children: "Make sure all food items are visible in the frame" })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-blue-600 font-semibold text-sm", children: "3" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900", children: "Close-up Shot" }), _jsx("p", { className: "text-sm text-gray-600", children: "Get close enough to see food details clearly" })] })] })] })] })] }));
};
export default UploadImagePage;
