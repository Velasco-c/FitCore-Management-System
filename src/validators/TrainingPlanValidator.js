export class TrainingPlanValidator {

    static validateCreate(data = {}) {
        const {
            name,
            description = null,
            durationWeeks,
            physicalGoals = null,
            level,
            price,
            status = "ACTIVE"
        } = data;

        this.validateName(name);
        this.validatePositiveInteger(durationWeeks, "durationWeeks");
        this.validateLevel(level);
        this.validatePrice(price);
        this.validateStatus(status);

        return {
            name: name.trim(),
            description,
            durationWeeks,
            physicalGoals,
            level,
            price,
            status
        };
    }

    static validateUpdate(data = {}) {
        return this.validateCreate(data);
    }

    static validateName(name) {
        if (typeof name !== "string" || !name.trim()) {
            throw new Error("El nombre es obligatorio.");
        }
    }

    static validatePositiveInteger(value, field) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error(`${field} debe ser un entero mayor que 0.`);
        }
    }

    static validateLevel(level) {
        if (!["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(level)) {
            throw new Error("El nivel no es válido.");
        }
    }

    static validatePrice(price) {
        if (typeof price !== "number" || price < 0) {
            throw new Error("El precio debe ser un número mayor o igual a 0.");
        }
    }

    static validateStatus(status) {
        if (!["ACTIVE", "INACTIVE"].includes(status)) {
            throw new Error("El estado no es válido.");
        }
    }
}