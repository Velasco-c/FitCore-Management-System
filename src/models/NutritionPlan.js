export class NutritionPlan {
    #id;
    #clientPlanId;
    #name;
    #description;
    #dailyCalorieTarget;
    #startDate;
    #endDate;
    #status;
    #createdAt;
    #updatedAt;

    constructor({
        id = null,
        clientPlanId = null,
        name = null,
        description = null,
        dailyCalorieTarget = null,
        startDate = null,
        endDate = null,
        status = "ACTIVE",
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.#id = id;
        this.clientPlanId = clientPlanId;
        this.name = name;
        this.description = description;
        this.dailyCalorieTarget = dailyCalorieTarget;
        this.startDate = startDate;
        this.endDate = endDate;
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

    get dailyCalorieTarget() {
        return this.#dailyCalorieTarget;
    }

    set dailyCalorieTarget(value) {
        this.#dailyCalorieTarget = value;
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