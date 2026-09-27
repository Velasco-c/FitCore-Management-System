export class Food {
    constructor({
        id = null,
        name = null,
        caloriesPer100g = null,
        unit = "g",
        status = "ACTIVE",
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.caloriesPer100g = caloriesPer100g;
        this.unit = unit;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}