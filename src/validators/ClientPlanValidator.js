import {
    isFiniteNumber,
    isPositiveInteger,
    isValidDate
} from "../utils/validation.js";

export class ClientPlanValidator {
    static STATUSES = ["ACTIVE", "COMPLETED", "CANCELLED", "EXPIRED"];

    static validateCreate(data = {}) {
        const {
            clientId,
            trainingPlanId,
            startDate,
            endDate,
            status = "ACTIVE",
            agreedPrice,
            goal = null,
            conditions = null,
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
        this.validateConditions(status, conditions);
        this.validateCancellationConsistency(
            status,
            cancelledAt,
            cancellationReason
        );

        return {
            clientId,
            trainingPlanId,
            startDate,
            endDate,
            status,
            agreedPrice,
            goal,
            conditions: conditions?.trim() ?? null,
            cancelledAt,
            cancellationReason: cancellationReason?.trim() ?? null
        };
    }

    static validateUpdate(data = {}) {
        const {
            trainingPlanId,
            startDate,
            endDate,
            status,
            agreedPrice,
            goal = null,
            cancelledAt = null,
            cancellationReason = null
        } = data;

        this.validateId(trainingPlanId, "trainingPlanId");
        this.validateDate(startDate, "startDate");
        this.validateDate(endDate, "endDate");
        this.validateDateRange(startDate, endDate);
        this.validateStatus(status);
        this.validatePrice(agreedPrice);
        this.validateCancellationConsistency(
            status,
            cancelledAt,
            cancellationReason
        );

        return {
            trainingPlanId,
            startDate,
            endDate,
            status,
            agreedPrice,
            goal,
            cancelledAt,
            cancellationReason: cancellationReason?.trim() ?? null
        };
    }

    // Todo plan que no nace cancelado genera un contrato automático,
    // y el contrato exige condiciones.
    static validateConditions(status, conditions) {
        if (status === "CANCELLED") return;

        if (typeof conditions !== "string" || !conditions.trim()) {
            throw new Error(
                "Las condiciones del contrato son obligatorias."
            );
        }
    }

    static validateCancellation(cancelledAt, cancellationReason) {
        this.validateDate(cancelledAt, "cancelledAt");

        if (
            typeof cancellationReason !== "string" ||
            !cancellationReason.trim()
        ) {
            throw new Error(
                "El motivo de cancelación es obligatorio."
            );
        }
    }

    static validateCancellationConsistency(
        status,
        cancelledAt,
        cancellationReason
    ) {
        if (status === "CANCELLED") {
            this.validateCancellation(cancelledAt, cancellationReason);
            return;
        }

        if (cancelledAt !== null && cancelledAt !== undefined) {
            throw new Error(
                "Solo un plan cancelado puede tener cancelledAt."
            );
        }

        if (
            cancellationReason !== null &&
            cancellationReason !== undefined
        ) {
            throw new Error(
                "Solo un plan cancelado puede tener cancellationReason."
            );
        }
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

    static validateDateRange(startDate, endDate) {
        if (new Date(endDate) < new Date(startDate)) {
            throw new Error(
                "endDate no puede ser anterior a startDate."
            );
        }
    }

    static validateStatus(status) {
        if (!this.STATUSES.includes(status)) {
            throw new Error("El estado del plan no es válido.");
        }
    }

    static validatePrice(price) {
        if (!isFiniteNumber(price) || price < 0) {
            throw new Error(
                "agreedPrice debe ser un número mayor o igual a 0."
            );
        }
    }
}