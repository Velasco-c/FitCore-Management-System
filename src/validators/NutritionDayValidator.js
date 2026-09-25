export class NutritionDayValidator {

    static validateCreate(data = {}) {
        const {
            nutritionPlanId,
            dayDate,
            notes = null
        } = data;

        this.validateId(nutritionPlanId, "nutritionPlanId");
        this.validateDate(dayDate, "dayDate");

        return {
            nutritionPlanId,
            dayDate,
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

    static validateDate(value, field) {
        if (!value || Number.isNaN(Date.parse(value))) {
            throw new Error(`${field} no es una fecha válida.`);
        }
    }
}