export class NutritionDayFoodValidator {

    static validateCreate(data = {}) {
        const {
            nutritionDayId,
            foodId,
            mealType,
            quantity,
            estimatedCalories = null,
            notes = null
        } = data;

        this.validateId(nutritionDayId, "nutritionDayId");
        this.validateId(foodId, "foodId");
        this.validateMealType(mealType);
        this.validatePositiveNumber(quantity, "quantity");
        this.validateCalories(estimatedCalories);

        return {
            nutritionDayId,
            foodId,
            mealType,
            quantity,
            estimatedCalories,
            notes
        };
    }

    static validateUpdate(data = {}) {
        return this.validateCreate(data);
    }

    static validateId(value, field) {
        if (!Number.isInteger(value) || value <= 0) {
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
        if (typeof value !== "number" || value <= 0) {
            throw new Error(`${field} debe ser mayor que 0.`);
        }
    }

    static validateCalories(value) {
        if (
            value !== null &&
            (typeof value !== "number" || value < 0)
        ) {
            throw new Error(
                "estimatedCalories debe ser mayor o igual a 0."
            );
        }
    }
}