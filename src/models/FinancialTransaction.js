export class FinancialTransaction {
    constructor({
        id = null,
        clientPlanId = null,
        type = null,
        category = null,
        amount = null,
        transactionDate = null,
        paymentMethod = null,
        description = null,
        reference = null,
        status = "COMPLETED",
        createdAt = null
    } = {}) {
        this.id = id;
        this.clientPlanId = clientPlanId;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.paymentMethod = paymentMethod;
        this.description = description;
        this.reference = reference;
        this.status = status;
        this.createdAt = createdAt;
    }
}