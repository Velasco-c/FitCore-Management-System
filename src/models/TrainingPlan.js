export class TrainingPlan {
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
        this.id = id;
        this.name = name;
        this.description = description;
        this.durationWeeks = durationWeeks;
        this.physicalGoals = physicalGoals;
        this.level = level;
        this.price = price;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}