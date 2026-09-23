export class FinancialTransaction {
    #id;
    #clientPlanId;
    #type;
    #category;
    #amount;
    #transactionDate;
    #paymentMethod;
    #description;
    #reference;
    #status;
    #createdAt;

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
        this.#id = id;
        this.clientPlanId = clientPlanId;
        this.type = type;
        this.category = category;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.paymentMethod = paymentMethod;
        this.description = description;
        this.reference = reference;
        this.status = status;
        this.#createdAt = createdAt;
    }

    get id() {
        return this.#id;
    }

    get clientPlanId() {
        return this.#clientPlanId;
    }

    set clientPlanId(value) {
        this.#clientPlanId = value;
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        this.#type = value;
    }

    get category() {
        return this.#category;
    }

    set category(value) {
        this.#category = value;
    }

    get amount() {
        return this.#amount;
    }

    set amount(value) {
        this.#amount = value;
    }

    get transactionDate() {
        return this.#transactionDate;
    }

    set transactionDate(value) {
        this.#transactionDate = value;
    }

    get paymentMethod() {
        return this.#paymentMethod;
    }

    set paymentMethod(value) {
        this.#paymentMethod = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get reference() {
        return this.#reference;
    }

    set reference(value) {
        this.#reference = value;
    }

    get status() {
        return this.#status;
    }

    set status(value) {
        this.#status = value;
    }

    get createdAt() {
        return this.#createdAt;
    }
}