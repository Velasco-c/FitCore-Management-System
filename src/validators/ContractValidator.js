import {
    isFiniteNumber,
    isPositiveInteger,
    isValidDate
} from "../utils/validation.js";

export class ContractValidator {

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
            contractNumber,
            conditions,
            startDate,
            endDate,
            price,
            status = "ACTIVE"
        } = data;

        this.validateRequiredString(contractNumber, "contractNumber");
        this.validateRequiredString(conditions, "conditions");
        this.validateDate(startDate, "startDate");
        this.validateDate(endDate, "endDate");
        this.validateDateRange(startDate, endDate);
        this.validatePrice(price);
        this.validateStatus(status);

        return {
            contractNumber: contractNumber.trim(),
            conditions,
            startDate,
            endDate,
            price,
            status
        };
    }

    static validateId(value, field) {
        if (!isPositiveInteger(value)) {
            throw new Error(`${field} debe ser un ID válido.`);
        }
    }

    static validateRequiredString(value, field) {
        if (typeof value !== "string" || !value.trim()) {
            throw new Error(`${field} es obligatorio.`);
        }
    }

    static validateDate(value, field) {
        if (!isValidDate(value)) {
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

    static validatePrice(price) {
        if (!isFiniteNumber(price) || price < 0) {
            throw new Error(
                "El precio debe ser un número mayor o igual a 0."
            );
        }
    }

    static validateStatus(status) {
        if (!["ACTIVE", "COMPLETED", "CANCELLED", "EXPIRED"].includes(status)) {
            throw new Error("El estado no es válido.");
        }
    }
}