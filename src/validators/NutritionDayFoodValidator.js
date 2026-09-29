import { isFiniteNumber, isPositiveInteger } from "../utils/validation.js";

export class NutritionDayFoodValidator {

    static validateCreate(data = {}) {
        const { nutritionDayId } = data;

        this.validateId(nutritionDayId, "nutritionDayId");

        return {
            nutritionDayId,
            ...this.validateUpdate(data)
        };
    }

    static validateUpdate(data = {}) {
        const {
            foodId,
            mealType,
            quantity,
            estimatedCalories = null,
            notes = null
        } = data;

        this.validateId(foodId, "foodId");
        this.validateMealType(mealType);
        this.validatePositiveNumber(quantity, "quantity");
        this.validateCalories(estimatedCalories);

        return {
            foodId,
            mealType,
            quantity,
            estimatedCalories,
            notes
        };
    }

    static validateId(value, field) {
        if (!isPositiveInteger(value)) {
            throw new Error(`${field} debe ser un ID válido.`);
        }
    }

    static validateMealType(mealType) {
        if (
            !["BREAKFAST", "SNACK", "LUNCH", "DINNER"].includes(mealType)
        ) {
            throw new Error("El tipo de comida no es válido.");
        }
    }

    static validatePositiveNumber(value, field) {
        if (!isFiniteNumber(value) || value <= 0) {
            throw new Error(`${field} debe ser mayor que 0.`);
        }
    }

    static validateCalories(value) {
        if (
            value !== null &&
            (!isFiniteNumber(value) || value < 0)
        ) {
            throw new Error(
                "estimatedCalories debe ser mayor o igual a 0."
            );
        }
    }
}