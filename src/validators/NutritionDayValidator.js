import { isPositiveInteger, isValidDate } from "../utils/validation.js";

export class NutritionDayValidator {

    static validateCreate(data = {}) {
        const { nutritionPlanId } = data;

        this.validateId(nutritionPlanId, "nutritionPlanId");

        return {
            nutritionPlanId,
            ...this.validateUpdate(data)
        };
    }

    static validateUpdate(data = {}) {
        const {
            dayDate,
            notes = null
        } = data;

        this.validateDate(dayDate, "dayDate");

        return {
            dayDate,
            notes
        };
    }

    static validateId(value, field) {
        if (!isPositiveInteger(value)) {
            throw new Error(`${field} debe ser un ID válido.`);
        }
    }

    static validateDate(value, field) {
        if (!isValidDate(value)) {
            throw new Error(`${field} no es una fecha válida.`);
        }
    }
}