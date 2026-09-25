export class NutritionPlanValidator {

    static validateCreate(data = {}) {
        const {
            clientPlanId,
            name,
            description = null,
            dailyCalorieTarget = null,
            startDate,
            endDate,
            status = "ACTIVE"
        } = data;

        this.validateId(clientPlanId, "clientPlanId");
        this.validateName(name);
        this.validateDate(startDate, "startDate");
        this.validateDate(endDate, "endDate");
        this.validateDateRange(startDate, endDate);
        this.validateCalories(dailyCalorieTarget);
        this.validateStatus(status);

        return {
            clientPlanId,
            name: name.trim(),
            description,
            dailyCalorieTarget,
            startDate,
            endDate,
            status
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

    static validateName(name) {
        if (typeof name !== "string" || !name.trim()) {
            throw new Error("El nombre es obligatorio.");
        }
    }

    static validateDate(value, field) {
        if (!value || Number.isNaN(Date.parse(value))) {
            throw new Error(`${field} no es una fecha válida.`);
        }
    }

    static validateDateRange(startDate, endDate) {
        if (new Date(endDate) < new Date(startDate)) {
            throw new Error(
                "endDate no puede ser anterior a startDate."
            );
        }
    }

    static validateCalories(value) {
        if (
            value !== null &&
            (typeof value !== "number" || value <= 0)
        ) {
            throw new Error(
                "dailyCalorieTarget debe ser mayor que 0."
            );
        }
    }

    static validateStatus(status) {
        if (!["ACTIVE", "INACTIVE", "COMPLETED"].includes(status)) {
            throw new Error("El estado no es válido.");
        }
    }
}   