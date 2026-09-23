export class NutritionDay {
    #id;
    #nutritionPlanId;
    #dayDate;
    #notes;

    constructor({
        id = null,
        nutritionPlanId = null,
        dayDate = null,
        notes = null
    } = {}) {
        this.#id = id;
        this.nutritionPlanId = nutritionPlanId;
        this.dayDate = dayDate;
        this.notes = notes;
    }

    get id() {
        return this.#id;
    }

    get nutritionPlanId() {
        return this.#nutritionPlanId;
    }

    set nutritionPlanId(value) {
        this.#nutritionPlanId = value;
    }

    get dayDate() {
        return this.#dayDate;
    }

    set dayDate(value) {
        this.#dayDate = value;
    }

    get notes() {
        return this.#notes;
    }

    set notes(value) {
        this.#notes = value;
    }
}