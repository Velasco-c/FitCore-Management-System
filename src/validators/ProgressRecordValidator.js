export class ProgressRecordValidator {

    static validateCreate(data = {}) {
        const {
            clientPlanId,
            recordDate,
            weightKg = null,
            bodyFatPercentage = null,
            waistCm = null,
            chestCm = null,
            armCm = null,
            legCm = null,
            photoUrl = null,
            comments = null
        } = data;

        this.validateId(clientPlanId, "clientPlanId");
        this.validateDate(recordDate, "recordDate");

        this.validatePositiveNumber(weightKg, "weightKg");
        this.validatePercentage(bodyFatPercentage);
        this.validatePositiveNumber(waistCm, "waistCm");
        this.validatePositiveNumber(chestCm, "chestCm");
        this.validatePositiveNumber(armCm, "armCm");
        this.validatePositiveNumber(legCm, "legCm");

        return {
            clientPlanId,
            recordDate,
            weightKg,
            bodyFatPercentage,
            waistCm,
            chestCm,
            armCm,
            legCm,
            photoUrl,
            comments
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

    static validatePositiveNumber(value, field) {
        if (value !== null && (typeof value !== "number" || value <= 0)) {
            throw new Error(`${field} debe ser mayor que 0.`);
        }
    }

    static validatePercentage(value) {
        if (
            value !== null &&
            (typeof value !== "number" || value < 0 || value > 100)
        ) {
            throw new Error(
                "bodyFatPercentage debe estar entre 0 y 100."
            );
        }
    }
}