import { geminiService } from './geminiService';

export interface Meal {
  id: string;
  name: string;
  timestamp: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  serving: string;
  confidence: number;
}

export interface DailyNutrition {
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  goals: NutritionGoals;
  remaining: NutritionGoals;
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

class NutritionService {
  private storageKey = 'health-hub-nutrition-data';

  getDefaultGoals(): NutritionGoals {
    return {
      calories: 2000,
      protein: 120,
      carbs: 250,
      fat: 65,
      fiber: 25
    };
  }

  async analyzeMeal(mealName: string): Promise<Omit<Meal, 'id' | 'timestamp'>> {
    try {
      const nutritionInfo = await geminiService.getFoodNutritionInfo(mealName);
      return {
        name: mealName,
        calories: nutritionInfo.calories,
        protein: nutritionInfo.protein,
        carbs: nutritionInfo.carbs,
        fat: nutritionInfo.fat,
        fiber: nutritionInfo.fiber,
        serving: '1 serving',
        confidence: nutritionInfo.confidence
      };
    } catch (error) {
      return this.getFallbackNutrition(mealName);
    }
  }

  private getFallbackNutrition(mealName: string): Omit<Meal, 'id' | 'timestamp'> {
    const lowerName = mealName.toLowerCase();
    
    if (lowerName.includes('chicken')) {
      return { name: mealName, calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, serving: '100g', confidence: 85 };
    } else if (lowerName.includes('rice')) {
      return { name: mealName, calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, serving: '100g', confidence: 90 };
    } else if (lowerName.includes('broccoli')) {
      return { name: mealName, calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, serving: '100g', confidence: 95 };
    } else if (lowerName.includes('salmon')) {
      return { name: mealName, calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0, serving: '100g', confidence: 90 };
    } else if (lowerName.includes('banana')) {
      return { name: mealName, calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, serving: '1 medium', confidence: 95 };
    } else if (lowerName.includes('apple')) {
      return { name: mealName, calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, serving: '1 medium', confidence: 95 };
    } else if (lowerName.includes('egg')) {
      return { name: mealName, calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, serving: '2 large', confidence: 90 };
    } else if (lowerName.includes('oatmeal')) {
      return { name: mealName, calories: 154, protein: 5.3, carbs: 27, fat: 3.1, fiber: 4, serving: '100g', confidence: 90 };
    } else if (lowerName.includes('yogurt')) {
      return { name: mealName, calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, serving: '100g', confidence: 85 };
    } else if (lowerName.includes('bread')) {
      return { name: mealName, calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, serving: '100g', confidence: 85 };
    }

    return {
      name: mealName,
      calories: 200,
      protein: 10,
      carbs: 25,
      fat: 8,
      fiber: 3,
      serving: '1 serving',
      confidence: 60
    };
  }

  async addMeal(mealName: string): Promise<Meal> {
    const nutritionInfo = await this.analyzeMeal(mealName);
    
    const meal: Meal = {
      id: Date.now().toString(),
      timestamp: new Date(),
      ...nutritionInfo
    };

    const today = new Date().toISOString().split('T')[0];
    const dailyData = this.getDailyNutrition(today);
    
    dailyData.meals.push(meal);
    this.saveDailyNutrition(dailyData);

    return meal;
  }

  removeMeal(mealId: string): void {
    const today = new Date().toISOString().split('T')[0];
    const dailyData = this.getDailyNutrition(today);
    
    dailyData.meals = dailyData.meals.filter(meal => meal.id !== mealId);
    this.saveDailyNutrition(dailyData);
  }

  getDailyNutrition(date: string): DailyNutrition {
    const data = this.getAllNutritionData();
    const goals = this.getDefaultGoals();

    const dailyData = data[date] || {
      date,
      meals: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalFiber: 0,
      goals,
      remaining: { ...goals }
    };

    dailyData.totalCalories = dailyData.meals.reduce((sum, meal) => sum + meal.calories, 0);
    dailyData.totalProtein = dailyData.meals.reduce((sum, meal) => sum + meal.protein, 0);
    dailyData.totalCarbs = dailyData.meals.reduce((sum, meal) => sum + meal.carbs, 0);
    dailyData.totalFat = dailyData.meals.reduce((sum, meal) => sum + meal.fat, 0);
    dailyData.totalFiber = dailyData.meals.reduce((sum, meal) => sum + meal.fiber, 0);

    dailyData.remaining = {
      calories: Math.max(0, goals.calories - dailyData.totalCalories),
      protein: Math.max(0, goals.protein - dailyData.totalProtein),
      carbs: Math.max(0, goals.carbs - dailyData.totalCarbs),
      fat: Math.max(0, goals.fat - dailyData.totalFat),
      fiber: Math.max(0, goals.fiber - dailyData.totalFiber)
    };

    return dailyData;
  }

  private getAllNutritionData(): { [date: string]: DailyNutrition } {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : {};
  }

  private saveDailyNutrition(dailyData: DailyNutrition): void {
    const data = this.getAllNutritionData();
    data[dailyData.date] = dailyData;
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}

export const nutritionService = new NutritionService();