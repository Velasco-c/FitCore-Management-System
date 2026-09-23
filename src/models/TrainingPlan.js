export class TrainingPlan {
    #id;
    #name;
    #description;
    #durationWeeks;
    #physicalGoals;
    #level;
    #price;
    #status;
    #createdAt;
    #updatedAt;

    constructor({
        id = null,
        name = null,
        description = null,
        durationWeeks = null,
        physicalGoals = null,
        level = null,
        price = null,
        status = "ACTIVE",
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.#id = id;
        this.name = name;
        this.description = description;
        this.durationWeeks = durationWeeks;
        this.physicalGoals = physicalGoals;
        this.level = level;
        this.price = price;
        this.status = status;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get durationWeeks() {
        return this.#durationWeeks;
    }

    set durationWeeks(value) {
        this.#durationWeeks = value;
    }

    get physicalGoals() {
        return this.#physicalGoals;
    }

    set physicalGoals(value) {
        this.#physicalGoals = value;
    }

    get level() {
        return this.#level;
    }

    set level(value) {
        this.#level = value;
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