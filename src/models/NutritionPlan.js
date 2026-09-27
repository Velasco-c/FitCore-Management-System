export class NutritionPlan {
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
        this.id = id;
        this.clientPlanId = clientPlanId;
        this.name = name;
        this.description = description;
        this.dailyCalorieTarget = dailyCalorieTarget;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}