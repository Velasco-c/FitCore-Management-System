export class NutritionDay {
    constructor({
        id = null,
        nutritionPlanId = null,
        dayDate = null,
        notes = null
    } = {}) {
        this.id = id;
        this.nutritionPlanId = nutritionPlanId;
        this.dayDate = dayDate;
        this.notes = notes;
    }
}