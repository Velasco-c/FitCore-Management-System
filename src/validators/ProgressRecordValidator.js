import {
    isFiniteNumber,
    isPositiveInteger,
    isValidDate
} from "../utils/validation.js";

export class ProgressRecordValidator {

    static validateCreate(data = {}) {
        const { clientPlanId } = data;

        this.validateId(clientPlanId, "clientPlanId");

        return {
            clientPlanId,
            ...this.validateUpdate(data)
        };
    }

    static validateUpdate(data = {}) {
        const {
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

        this.validateDate(recordDate, "recordDate");

        this.validatePositiveNumber(weightKg, "weightKg");
        this.validatePercentage(bodyFatPercentage);
        this.validatePositiveNumber(waistCm, "waistCm");
        this.validatePositiveNumber(chestCm, "chestCm");
        this.validatePositiveNumber(armCm, "armCm");
        this.validatePositiveNumber(legCm, "legCm");

        return {
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

    static validatePositiveNumber(value, field) {
        if (value !== null && (!isFiniteNumber(value) || value <= 0)) {
            throw new Error(`${field} debe ser mayor que 0.`);
        }
    }

    static validatePercentage(value) {
        if (
            value !== null &&
            (!isFiniteNumber(value) || value < 0 || value > 100)
        ) {
            throw new Error(
                "bodyFatPercentage debe estar entre 0 y 100."
            );
        }
    }
}