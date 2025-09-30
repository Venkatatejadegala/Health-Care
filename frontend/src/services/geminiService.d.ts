export interface FoodAnalysisResult {
    foodName: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar?: number;
    servingSize?: string;
    confidence: number;
    description: string;
}
export type FoodAnalysis = FoodAnalysisResult;
export interface HealthRecommendation {
    title: string;
    description: string;
    category: 'nutrition' | 'exercise' | 'sleep' | 'mental' | 'general';
    priority: 'high' | 'medium' | 'low';
}
declare class GeminiService {
    private model;
    private visionModel;
    /**
     * Update API key dynamically
     */
    updateApiKey(newApiKey: string): boolean;
    /**
     * Test all available Gemini models
     */
    testAllModels(): Promise<Array<{
        model: string;
        success: boolean;
        response?: string;
        error?: string;
    }>>;
    /**
     * Test if the API key is working
     */
    testConnection(): Promise<boolean>;
    /**
     * Analyze food from image using Gemini Vision API
     */
    analyzeFoodFromImage(imageFile: File): Promise<FoodAnalysisResult>;
    /**
     * Get personalized health recommendations
     */
    getHealthRecommendations(userProfile: {
        age: number;
        gender: string;
        height: number;
        weight: number;
        activityLevel: string;
        goals: string[];
    }): Promise<HealthRecommendation[]>;
    /**
     * Get mock health recommendations for demo purposes
     */
    private getMockRecommendations;
    /**
     * Get nutrition information for a food item
     */
    getFoodNutritionInfo(foodName: string): Promise<FoodAnalysisResult>;
    /**
     * Generate health tips based on current trends and best practices
     */
    generateHealthTips(category?: string): Promise<string[]>;
    /**
     * Ask AI about food, nutrients, and health issues based on user goals
     */
    askAboutFoodAndHealth(question: string, userProfile: {
        age: number;
        gender: string;
        height: number;
        weight: number;
        activityLevel: string;
        goals: string[];
    }): Promise<string>;
    /**
     * Get fallback response when AI API fails
     */
    private getFallbackResponse;
    /**
     * Search for food information (alias for getFoodNutritionInfo)
     */
    searchFoodInfo(foodName: string): Promise<FoodAnalysisResult>;
    /**
     * Analyze food image (alias for analyzeFoodFromImage)
     */
    analyzeFoodImage(imageFile: File): Promise<FoodAnalysisResult>;
    /**
     * Convert file to Generative AI part
     */
    private fileToGenerativePart;
}
export declare const geminiService: GeminiService;
export {};
