import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAQ-6GlEowqPo9671D0UPPwNl6ceMumRHY');

export interface FoodAnalysisResult {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  confidence: number;
  description: string;
}

export interface HealthRecommendation {
  title: string;
  description: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'mental' | 'general';
  priority: 'high' | 'medium' | 'low';
}

class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  private visionModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  /**
   * Update API key dynamically
   */
  updateApiKey(newApiKey: string) {
    try {
      const newGenAI = new GoogleGenerativeAI(newApiKey);
      this.model = newGenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      this.visionModel = newGenAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      console.log('API key updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update API key:', error);
      return false;
    }
  }


  /**
   * Test all available Gemini models
   */
  async testAllModels(): Promise<Array<{model: string, success: boolean, response?: string, error?: string}>> {
    const models = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash-exp',
      'gemini-pro',
      'gemini-pro-vision',
      'gemini-1.0-pro',
      'gemini-1.5-flash-8b',
      'gemini-1.5-flash-002',
      'gemini-1.5-pro-002'
    ];

    const results: Array<{model: string, success: boolean, response?: string, error?: string}> = [];
    
    for (const modelName of models) {
      try {
        console.log(`🧪 Testing model: ${modelName}...`);
        const testModel = genAI.getGenerativeModel({ model: modelName });
        const result = await testModel.generateContent('Hi');
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ ${modelName} - SUCCESS:`, text.substring(0, 50) + '...');
        results.push({ model: modelName, success: true, response: text });
        
        // If this is the first successful model, update our main model
        if (results.filter(r => r.success).length === 1) {
          this.model = testModel;
          this.visionModel = testModel;
          console.log(`🎯 Set ${modelName} as primary model`);
        }
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        console.log(`❌ ${modelName} - FAILED:`, errorMsg);
        results.push({ model: modelName, success: false, error: errorMsg });
      }
    }
    
    return results;
  }

  /**
   * Test if the API key is working
   */
  async testConnection(): Promise<boolean> {
    console.log('🔍 Testing all available Gemini models...');
    const results = await this.testAllModels();
    
    const successfulModels = results.filter(r => r.success);
    const failedModels = results.filter(r => !r.success);
    
    console.log(`\n📊 RESULTS:`);
    console.log(`✅ Working models: ${successfulModels.length}`);
    console.log(`❌ Failed models: ${failedModels.length}`);
    
    if (successfulModels.length > 0) {
      console.log(`\n🎯 Working models:`);
      successfulModels.forEach(r => console.log(`  ✅ ${r.model}`));
      
      console.log(`\n❌ Failed models:`);
      failedModels.forEach(r => console.log(`  ❌ ${r.model}: ${r.error}`));
      
      return true;
    } else {
      console.log(`\n❌ No models are working with your API key`);
      return false;
    }
  }

  /**
   * Analyze food from image using Gemini Vision API
   */
  async analyzeFoodFromImage(imageFile: File): Promise<FoodAnalysisResult> {
    try {
      const imageData = await this.fileToGenerativePart(imageFile);
      
      const prompt = `
        Analyze this food image and provide detailed nutritional information in JSON format.
        Return ONLY a valid JSON object with these exact fields:
        {
          "foodName": "string (name of the food)",
          "calories": number (calories per serving),
          "protein": number (grams of protein),
          "carbs": number (grams of carbohydrates),
          "fat": number (grams of fat),
          "fiber": number (grams of fiber),
          "confidence": number (0-100, how confident you are in this analysis),
          "description": "string (brief description of the food)"
        }
        
        Be as accurate as possible with nutritional values. If you can't identify the food clearly, set confidence to a lower value.
      `;

      const result = await this.visionModel.generateContent([prompt, imageData]);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const foodData = JSON.parse(jsonMatch[0]);
        return foodData as FoodAnalysisResult;
      } else {
        throw new Error('Could not parse food analysis result');
      }
    } catch (error) {
      console.error('Error analyzing food image:', error);
      throw new Error('Failed to analyze food image. Please try again.');
    }
  }

  /**
   * Get personalized health recommendations
   */
  async getHealthRecommendations(userProfile: {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goals: string[];
  }): Promise<HealthRecommendation[]> {
    try {
      const prompt = `
        Based on this user profile, provide 5 personalized health recommendations in JSON format:
        
        User Profile:
        - Age: ${userProfile.age}
        - Gender: ${userProfile.gender}
        - Height: ${userProfile.height} cm
        - Weight: ${userProfile.weight} kg
        - Activity Level: ${userProfile.activityLevel}
        - Goals: ${userProfile.goals.join(', ')}
        
        Return ONLY a valid JSON array with these exact fields for each recommendation:
        [
          {
            "title": "string (recommendation title)",
            "description": "string (detailed description)",
            "category": "nutrition" | "exercise" | "sleep" | "mental" | "general",
            "priority": "high" | "medium" | "low"
          }
        ]
        
        Make recommendations practical, actionable, and personalized to their profile. Focus on evidence-based health advice.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recommendations = JSON.parse(jsonMatch[0]);
        return recommendations as HealthRecommendation[];
      } else {
        throw new Error('Could not parse recommendations');
      }
    } catch (error) {
      console.error('Error getting health recommendations:', error);
      // Fallback to mock recommendations if API fails
      return this.getMockRecommendations(userProfile);
    }
  }

  /**
   * Get mock health recommendations for demo purposes
   */
  private async getMockRecommendations(userProfile: {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goals: string[];
  }): Promise<HealthRecommendation[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const recommendations: HealthRecommendation[] = [
          {
            title: 'Optimize Your Protein Intake',
            description: `Based on your weight of ${userProfile.weight}kg, aim for 1.2-1.6g of protein per kg of body weight daily. This means consuming ${Math.round(userProfile.weight * 1.4)}-${Math.round(userProfile.weight * 1.6)}g of protein per day for muscle building and recovery.`,
            category: 'nutrition',
            priority: 'high'
          },
          {
            title: 'Increase Daily Water Intake',
            description: 'Aim for 8-10 glasses of water daily to support metabolism and overall health. Your current intake appears to be below the recommended amount for optimal hydration.',
            category: 'general',
            priority: 'medium'
          },
          {
            title: 'Establish Consistent Sleep Schedule',
            description: 'Maintain a regular sleep schedule with 7-9 hours of quality sleep for optimal recovery and cognitive function. This is especially important for your fitness goals.',
            category: 'sleep',
            priority: 'high'
          },
          {
            title: 'Add More Fiber to Your Diet',
            description: 'Include more whole grains, fruits, and vegetables to improve digestion and maintain stable blood sugar levels. This will support your weight management goals.',
            category: 'nutrition',
            priority: 'medium'
          },
          {
            title: 'Incorporate Strength Training',
            description: `Add 2-3 strength training sessions per week to build muscle mass and improve bone density. Given your ${userProfile.activityLevel} activity level, this will help you reach your muscle gain goals.`,
            category: 'exercise',
            priority: 'high'
          }
        ];
        resolve(recommendations);
      }, 2000); // 2 second delay to simulate API call
    });
  }

  /**
   * Get nutrition information for a food item
   */
  async getFoodNutritionInfo(foodName: string): Promise<FoodAnalysisResult> {
    try {
      const prompt = `
        Provide detailed nutritional information for "${foodName}" in JSON format.
        Return ONLY a valid JSON object with these exact fields:
        {
          "foodName": "${foodName}",
          "calories": number (calories per 100g),
          "protein": number (grams of protein per 100g),
          "carbs": number (grams of carbohydrates per 100g),
          "fat": number (grams of fat per 100g),
          "fiber": number (grams of fiber per 100g),
          "confidence": 95,
          "description": "string (brief description of the food)"
        }
        
        Use accurate nutritional data for this food item.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const foodData = JSON.parse(jsonMatch[0]);
        return foodData as FoodAnalysisResult;
      } else {
        throw new Error('Could not parse food nutrition info');
      }
    } catch (error) {
      console.error('Error getting food nutrition info:', error);
      throw new Error('Failed to get nutrition information. Please try again.');
    }
  }

  /**
   * Generate health tips based on current trends and best practices
   */
  async generateHealthTips(category: string = 'general'): Promise<string[]> {
    try {
      const prompt = `
        Generate 5 practical health tips for the "${category}" category.
        Return ONLY a JSON array of strings:
        ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"]
        
        Make tips actionable, evidence-based, and easy to follow.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const tips = JSON.parse(jsonMatch[0]);
        return tips as string[];
      } else {
        throw new Error('Could not parse health tips');
      }
    } catch (error) {
      console.error('Error generating health tips:', error);
      throw new Error('Failed to generate health tips. Please try again.');
    }
  }

  /**
   * Ask AI about food, nutrients, and health issues based on user goals
   */
  async askAboutFoodAndHealth(question: string, userProfile: {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goals: string[];
  }): Promise<string> {
    try {
      console.log('Asking AI about:', question);
      console.log('User profile:', userProfile);
      
          const prompt = `
            You are a concise health expert. Answer this question briefly but valuably:
            
            Question: "${question}"
            Profile: ${userProfile.age}y, ${userProfile.gender}, ${userProfile.height}cm, ${userProfile.weight}kg, ${userProfile.activityLevel}, Goals: ${userProfile.goals.join(', ')}
            
            Give a crisp, actionable answer (2-3 sentences max) focusing on:
            - Direct answer to their question
            - One specific actionable tip
            - How it relates to their goals
            
            Be practical and evidence-based. No fluff.
          `;

      console.log('Sending prompt to Gemini...');
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Received response from Gemini:', text);
      return text;
    } catch (error) {
      console.error('Error asking AI about food and health:', error);
      console.error('Error details:', error);
      
      // Return a fallback response instead of throwing
      return this.getFallbackResponse(question, userProfile);
    }
  }

  /**
   * Get fallback response when AI API fails
   */
  private getFallbackResponse(question: string, userProfile: {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goals: string[];
  }): string {
    const lowerQuestion = question.toLowerCase();
    
        if (lowerQuestion.includes('protein') || lowerQuestion.includes('muscle')) {
          return `For your ${userProfile.goals.join(', ')} goals, aim for ${Math.round(userProfile.weight * 1.4)}-${Math.round(userProfile.weight * 1.6)}g protein daily. Best sources: chicken, fish, eggs, Greek yogurt. Eat protein within 30 minutes post-workout for optimal muscle building.`;
        }
    
        if (lowerQuestion.includes('weight loss') || lowerQuestion.includes('lose weight')) {
          return `For weight loss: create a 300-500 calorie daily deficit. Focus on high-fiber foods, lean proteins, and healthy fats. Use smaller plates, drink water before meals, and combine cardio with strength training for best results.`;
        }
    
        if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia')) {
          return `For better sleep: eat complex carbs (oatmeal) and tryptophan-rich foods (turkey, milk) 2-3 hours before bed. Avoid caffeine after 2 PM, maintain consistent sleep schedule, and keep bedroom cool and dark.`;
        }
    
        if (lowerQuestion.includes('vitamin') || lowerQuestion.includes('supplement')) {
          return `Key nutrients for your goals: Vitamin D (bone health), B-complex (energy), Magnesium (muscle function), Iron (oxygen transport). Get nutrients from whole foods first, then consider supplements if needed.`;
        }
    
        // Default response
        return `For your ${userProfile.goals.join(', ')} goals: maintain a balanced diet, stay hydrated (8-10 glasses daily), get regular exercise, prioritize 7-9 hours sleep, and manage stress. Consult a healthcare professional for personalized advice.`;
  }

  /**
   * Convert file to Generative AI part
   */
  private async fileToGenerativePart(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          inlineData: {
            data: reader.result?.toString().split(',')[1],
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const geminiService = new GeminiService();