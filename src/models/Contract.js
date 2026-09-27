export class Contract {
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
        this.id = id;
        this.clientPlanId = clientPlanId;
        this.contractNumber = contractNumber;
        this.conditions = conditions;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}