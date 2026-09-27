export class NutritionDayFood {
    constructor({
        id = null,
        nutritionDayId = null,
        foodId = null,
        mealType = null,
        quantity = null,
        estimatedCalories = null,
        notes = null
    } = {}) {
        this.id = id;
        this.nutritionDayId = nutritionDayId;
        this.foodId = foodId;
        this.mealType = mealType;
        this.quantity = quantity;
        this.estimatedCalories = estimatedCalories;
        this.notes = notes;
    }
}