import { geminiService } from './geminiService';
class NutritionService {
    constructor() {
        Object.defineProperty(this, "storageKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'health-hub-nutrition-data'
        });
    }
    getDefaultGoals() {
        return {
            calories: 2000,
            protein: 120,
            carbs: 250,
            fat: 65,
            fiber: 25,
            water: 2000
        };
    }
    async analyzeMeal(mealName) {
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
                confidence: nutritionInfo.confidence,
                mealType: 'meal'
            };
        }
        catch (error) {
            return this.getFallbackNutrition(mealName);
        }
    }
    getFallbackNutrition(mealName) {
        const lowerName = mealName.toLowerCase();
        if (lowerName.includes('chicken')) {
            return { name: mealName, calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, serving: '100g', confidence: 85, mealType: 'main' };
        }
        else if (lowerName.includes('rice')) {
            return { name: mealName, calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, serving: '100g', confidence: 90, mealType: 'main' };
        }
        else if (lowerName.includes('broccoli')) {
            return { name: mealName, calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, serving: '100g', confidence: 95, mealType: 'side' };
        }
        else if (lowerName.includes('salmon')) {
            return { name: mealName, calories: 208, protein: 25, carbs: 0, fat: 12, fiber: 0, serving: '100g', confidence: 90, mealType: 'main' };
        }
        else if (lowerName.includes('banana')) {
            return { name: mealName, calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, serving: '1 medium', confidence: 95, mealType: 'snack' };
        }
        else if (lowerName.includes('apple')) {
            return { name: mealName, calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, serving: '1 medium', confidence: 95, mealType: 'snack' };
        }
        else if (lowerName.includes('egg')) {
            return { name: mealName, calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, serving: '2 large', confidence: 90, mealType: 'main' };
        }
        else if (lowerName.includes('oatmeal')) {
            return { name: mealName, calories: 154, protein: 5.3, carbs: 27, fat: 3.1, fiber: 4, serving: '100g', confidence: 90, mealType: 'breakfast' };
        }
        else if (lowerName.includes('yogurt')) {
            return { name: mealName, calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, serving: '100g', confidence: 85, mealType: 'snack' };
        }
        else if (lowerName.includes('bread')) {
            return { name: mealName, calories: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7, serving: '100g', confidence: 85, mealType: 'main' };
        }
        return {
            name: mealName,
            calories: 200,
            protein: 10,
            carbs: 25,
            fat: 8,
            fiber: 3,
            serving: '1 serving',
            confidence: 60,
            mealType: 'meal'
        };
    }
    async addMeal(mealName) {
        const nutritionInfo = await this.analyzeMeal(mealName);
        const meal = {
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
    removeMeal(mealId) {
        const today = new Date().toISOString().split('T')[0];
        const dailyData = this.getDailyNutrition(today);
        dailyData.meals = dailyData.meals.filter(meal => meal.id !== mealId);
        this.saveDailyNutrition(dailyData);
    }
    getDailyNutrition(date) {
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
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
            water: 0,
            goals,
            remaining: { ...goals }
        };
        dailyData.totalCalories = dailyData.meals.reduce((sum, meal) => sum + meal.calories, 0);
        dailyData.totalProtein = dailyData.meals.reduce((sum, meal) => sum + meal.protein, 0);
        dailyData.totalCarbs = dailyData.meals.reduce((sum, meal) => sum + meal.carbs, 0);
        dailyData.totalFat = dailyData.meals.reduce((sum, meal) => sum + meal.fat, 0);
        dailyData.totalFiber = dailyData.meals.reduce((sum, meal) => sum + meal.fiber, 0);
        // Set individual properties to match totals
        dailyData.calories = dailyData.totalCalories;
        dailyData.protein = dailyData.totalProtein;
        dailyData.carbs = dailyData.totalCarbs;
        dailyData.fat = dailyData.totalFat;
        dailyData.fiber = dailyData.totalFiber;
        dailyData.remaining = {
            calories: Math.max(0, goals.calories - dailyData.totalCalories),
            protein: Math.max(0, goals.protein - dailyData.totalProtein),
            carbs: Math.max(0, goals.carbs - dailyData.totalCarbs),
            fat: Math.max(0, goals.fat - dailyData.totalFat),
            fiber: Math.max(0, goals.fiber - dailyData.totalFiber),
            water: Math.max(0, goals.water - dailyData.water)
        };
        return dailyData;
    }
    getAllNutritionData() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {};
    }
    saveDailyNutrition(dailyData) {
        const data = this.getAllNutritionData();
        data[dailyData.date] = dailyData;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    calculateBMR(weightOrProfile, height, age, gender) {
        // Mifflin-St Jeor Equation
        let weight, userHeight, userAge, userGender;
        if (typeof weightOrProfile === 'object') {
            weight = weightOrProfile.weight;
            userHeight = weightOrProfile.height;
            userAge = weightOrProfile.age;
            userGender = weightOrProfile.gender;
        }
        else {
            weight = weightOrProfile;
            userHeight = height;
            userAge = age;
            userGender = gender;
        }
        if (userGender.toLowerCase() === 'male') {
            return 10 * weight + 6.25 * userHeight - 5 * userAge + 5;
        }
        else {
            return 10 * weight + 6.25 * userHeight - 5 * userAge - 161;
        }
    }
    calculateTDEE(bmrOrProfile, activityLevel) {
        let bmr, userActivityLevel;
        if (typeof bmrOrProfile === 'object') {
            bmr = this.calculateBMR(bmrOrProfile);
            userActivityLevel = bmrOrProfile.activityLevel;
        }
        else {
            bmr = bmrOrProfile;
            userActivityLevel = activityLevel;
        }
        const multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
            'very_active': 1.9
        };
        return bmr * (multipliers[userActivityLevel.toLowerCase()] || 1.2);
    }
    calculateNutritionGoals(tdeeOrProfile, goals) {
        let tdee, userGoals;
        if (typeof tdeeOrProfile === 'object') {
            tdee = this.calculateTDEE(tdeeOrProfile);
            userGoals = tdeeOrProfile.goals;
        }
        else {
            tdee = tdeeOrProfile;
            userGoals = goals;
        }
        const proteinPerKg = userGoals.includes('muscle gain') ? 2.2 : 1.6;
        const protein = Math.round(70 * proteinPerKg); // Assuming 70kg average weight
        return {
            calories: Math.round(tdee),
            protein: protein,
            carbs: Math.round((tdee * 0.45) / 4), // 45% of calories from carbs
            fat: Math.round((tdee * 0.25) / 9), // 25% of calories from fat
            fiber: 25,
            water: 2000
        };
    }
}
export const nutritionService = new NutritionService();
