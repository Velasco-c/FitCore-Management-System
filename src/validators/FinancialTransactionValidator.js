export class FinancialTransactionValidator {

    static validateCreate(data = {}) {
        const {
            clientPlanId = null,
            type,
            category,
            amount,
            transactionDate,
            paymentMethod = null,
            description = null,
            reference = null,
            status = "PENDING"
        } = data;

        this.validateClientPlanId(clientPlanId);
        this.validateType(type);
        this.validateCategory(category);
        this.validateAmount(amount);
        this.validateDate(transactionDate);
        this.validatePaymentMethod(paymentMethod);
        this.validateStatus(status);

        return {
            clientPlanId,
            type,
            category,
            amount,
            transactionDate,
            paymentMethod,
            description,
            reference,
            status
        };
    }

    static validateUpdate(data = {}) {
        return this.validateCreate(data);
    }

    static validateClientPlanId(value) {
        if (
            value !== null &&
            (!Number.isInteger(value) || value <= 0)
        ) {
            throw new Error(
                "clientPlanId debe ser un ID válido."
            );
        }
    }

    static validateType(type) {
        if (!["INCOME", "EXPENSE"].includes(type)) {
            throw new Error("El tipo de transacción no es válido.");
        }
    }

    static validateCategory(category) {
        const categories = [
            "MEMBERSHIP",
            "PERSONAL_SESSION",
            "SERVICES",
            "SUPPLEMENTS",
            "OPERATING",
            "OTHER"
        ];

        if (!categories.includes(category)) {
            throw new Error("La categoría no es válida.");
        }
    }

    static validateAmount(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            throw new Error("El monto debe ser mayor que 0.");
        }
    }

    static validateDate(value) {
        if (!value || Number.isNaN(Date.parse(value))) {
            throw new Error("transactionDate no es una fecha válida.");
        }
    }

    static validatePaymentMethod(paymentMethod) {
        if (
            paymentMethod !== null &&
            !["CASH", "CARD", "TRANSFER", "OTHER"].includes(paymentMethod)
        ) {
            throw new Error(
                "El método de pago no es válido."
            );
        }
    }

    static validateStatus(status) {
        if (
            !["PENDING", "COMPLETED", "CANCELLED"].includes(status)
        ) {
            throw new Error("El estado no es válido.");
        }
    }
}