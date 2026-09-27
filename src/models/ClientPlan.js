export class ClientPlan {
    constructor({
        id = null,
        clientId = null,
        trainingPlanId = null,
        startDate = null,
        endDate = null,
        status = "ACTIVE",
        agreedPrice = null,
        goal = null,
        cancelledAt = null,
        cancellationReason = null,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.clientId = clientId;
        this.trainingPlanId = trainingPlanId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.agreedPrice = agreedPrice;
        this.goal = goal;
        this.cancelledAt = cancelledAt;
        this.cancellationReason = cancellationReason;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}