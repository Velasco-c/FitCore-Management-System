export class Contract {
    #id;
    #clientPlanId;
    #contractNumber;
    #conditions;
    #startDate;
    #endDate;
    #price;
    #status;
    #createdAt;
    #updatedAt;

    constructor({
        id = null,
        clientPlanId = null,
        contractNumber = null,
        conditions = null,
        startDate = null,
        endDate = null,
        price = null,
        status = "ACTIVE",
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.#id = id;
        this.clientPlanId = clientPlanId;
        this.contractNumber = contractNumber;
        this.conditions = conditions;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.status = status;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
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

    get contractNumber() {
        return this.#contractNumber;
    }

    set contractNumber(value) {
        this.#contractNumber = value;
    }

    get conditions() {
        return this.#conditions;
    }

    set conditions(value) {
        this.#conditions = value;
    }

    get startDate() {
        return this.#startDate;
    }

    set startDate(value) {
        this.#startDate = value;
    }

    get endDate() {
        return this.#endDate;
    }

    set endDate(value) {
        this.#endDate = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#price = value;
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

    get updatedAt() {
        return this.#updatedAt;
    }
}