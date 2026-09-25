export class FoodValidator {

    static validateCreate(data = {}) {
        const {
            name,
            caloriesPer100g = null,
            unit = "g",
            status = "ACTIVE"
        } = data;

        this.validateName(name);
        this.validateCalories(caloriesPer100g);
        this.validateUnit(unit);
        this.validateStatus(status);

        return {
            name: name.trim(),
            caloriesPer100g,
            unit: unit.trim(),
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

    static validateCalories(value) {
        if (
            value !== null &&
            (typeof value !== "number" || value < 0)
        ) {
            throw new Error(
                "caloriesPer100g debe ser mayor o igual a 0."
            );
        }
    }

    static validateUnit(unit) {
        if (typeof unit !== "string" || !unit.trim()) {
            throw new Error("La unidad es obligatoria.");
        }
    }

    static validateStatus(status) {
        if (!["ACTIVE", "INACTIVE"].includes(status)) {
            throw new Error("El estado no es válido.");
        }
    }
}