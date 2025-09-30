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
    mealType: string;
}
export interface DailyNutrition {
    date: string;
    meals: Meal[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    totalFiber: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    water: number;
    goals: NutritionGoals;
    remaining: NutritionGoals;
}
export interface NutritionGoals {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    water: number;
}
export interface UserProfile {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    goals: string[];
    goal?: string;
    dietaryRestrictions?: string[];
}
export type MealEntry = Meal;
declare class NutritionService {
    private storageKey;
    getDefaultGoals(): NutritionGoals;
    analyzeMeal(mealName: string): Promise<Omit<Meal, 'id' | 'timestamp'>>;
    private getFallbackNutrition;
    addMeal(mealName: string): Promise<Meal>;
    removeMeal(mealId: string): void;
    getDailyNutrition(date: string): DailyNutrition;
    private getAllNutritionData;
    private saveDailyNutrition;
    calculateBMR(weight: number, height: number, age: number, gender: string): number;
    calculateBMR(userProfile: UserProfile): number;
    calculateTDEE(bmr: number, activityLevel: string): number;
    calculateTDEE(userProfile: UserProfile): number;
    calculateNutritionGoals(tdee: number, goals: string[]): NutritionGoals;
    calculateNutritionGoals(userProfile: UserProfile): NutritionGoals;
}
export declare const nutritionService: NutritionService;
export {};
