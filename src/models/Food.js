export class Food {
    #id;
    #name;
    #caloriesPer100g;
    #unit;
    #status;
    #createdAt;
    #updatedAt;

    constructor({
        id = null,
        name = null,
        caloriesPer100g = null,
        unit = "g",
        status = "ACTIVE",
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.#id = id;
        this.name = name;
        this.caloriesPer100g = caloriesPer100g;
        this.unit = unit;
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

    get caloriesPer100g() {
        return this.#caloriesPer100g;
    }

    set caloriesPer100g(value) {
        this.#caloriesPer100g = value;
    }

    get unit() {
        return this.#unit;
    }

    set unit(value) {
        this.#unit = value;
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