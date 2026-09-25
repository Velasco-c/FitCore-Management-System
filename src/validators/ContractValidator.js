export class ContractValidator {

    static validateCreate(data = {}) {
        const {
            clientPlanId,
            contractNumber,
            conditions = null,
            startDate,
            endDate,
            price,
            status = "ACTIVE"
        } = data;

        this.validateId(clientPlanId, "clientPlanId");
        this.validateRequiredString(contractNumber, "contractNumber");
        this.validateDate(startDate, "startDate");
        this.validateDate(endDate, "endDate");
        this.validateDateRange(startDate, endDate);
        this.validatePrice(price);
        this.validateStatus(status);

        return {
            clientPlanId,
            contractNumber: contractNumber.trim(),
            conditions,
            startDate,
            endDate,
            price,
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

    static validateRequiredString(value, field) {
        if (typeof value !== "string" || !value.trim()) {
            throw new Error(`${field} es obligatorio.`);
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

    static validatePrice(price) {
        if (typeof price !== "number" || price < 0) {
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