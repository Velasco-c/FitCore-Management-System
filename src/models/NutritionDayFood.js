export class NutritionDayFood {
    #id;
    #nutritionDayId;
    #foodId;
    #mealType;
    #quantity;
    #estimatedCalories;
    #notes;

    constructor({
        id = null,
        nutritionDayId = null,
        foodId = null,
        mealType = null,
        quantity = null,
        estimatedCalories = null,
        notes = null
    } = {}) {
        this.#id = id;
        this.nutritionDayId = nutritionDayId;
        this.foodId = foodId;
        this.mealType = mealType;
        this.quantity = quantity;
        this.estimatedCalories = estimatedCalories;
        this.notes = notes;
    }

    get id() {
        return this.#id;
    }

    get nutritionDayId() {
        return this.#nutritionDayId;
    }

    set nutritionDayId(value) {
        this.#nutritionDayId = value;
    }

    get foodId() {
        return this.#foodId;
    }

    set foodId(value) {
        this.#foodId = value;
    }

    get mealType() {
        return this.#mealType;
    }

    set mealType(value) {
        this.#mealType = value;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        this.#quantity = value;
    }

    get estimatedCalories() {
        return this.#estimatedCalories;
    }

    set estimatedCalories(value) {
        this.#estimatedCalories = value;
    }

    get notes() {
        return this.#notes;
    }

    set notes(value) {
        this.#notes = value;
    }
}