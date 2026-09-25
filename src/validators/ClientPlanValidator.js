export class ClientPlanValidator {

    static validateCreate(data = {}) {
        const {
            clientId,
            trainingPlanId,
            startDate,
            endDate,
            status = "ACTIVE",
            agreedPrice,
            goal = null,
            cancelledAt = null,
            cancellationReason = null
        } = data;

        this.validateId(clientId, "clientId");
        this.validateId(trainingPlanId, "trainingPlanId");
        this.validateDate(startDate, "startDate");
        this.validateDate(endDate, "endDate");
        this.validateDateRange(startDate, endDate);
        this.validateStatus(status);
        this.validatePrice(agreedPrice);

        if (status === "CANCELLED") {
            if (!cancelledAt) {
                throw new Error(
                    "Un plan cancelado debe tener cancelledAt."
                );
            }

            if (!cancellationReason?.trim()) {
                throw new Error(
                    "Un plan cancelado debe tener cancellationReason."
                );
            }

            this.validateDate(cancelledAt, "cancelledAt");
        }

        return {
            clientId,
            trainingPlanId,
            startDate,
            endDate,
            status,
            agreedPrice,
            goal,
            cancelledAt,
            cancellationReason
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

    static validateDateRange(startDate, endDate) {
        if (new Date(endDate) < new Date(startDate)) {
            throw new Error(
                "endDate no puede ser anterior a startDate."
            );
        }
    }

    static validateStatus(status) {
        if (
            !["ACTIVE", "COMPLETED", "CANCELLED", "EXPIRED"].includes(status)
        ) {
            throw new Error("El estado del plan no es válido.");
        }
    }

    static validatePrice(price) {
        if (typeof price !== "number" || price < 0) {
            throw new Error(
                "agreedPrice debe ser un número mayor o igual a 0."
            );
        }
    }
}