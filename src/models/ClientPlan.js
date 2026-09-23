export class ClientPlan {
    #id;
    #clientId;
    #trainingPlanId;
    #previousClientPlanId;
    #startDate;
    #endDate;
    #status;
    #agreedPrice;
    #goal;
    #cancelledAt;
    #cancellationReason;
    #createdAt;
    #updatedAt;

    constructor({
        id = null,
        clientId = null,
        trainingPlanId = null,
        previousClientPlanId = null,
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
        this.#id = id;
        this.clientId = clientId;
        this.trainingPlanId = trainingPlanId;
        this.previousClientPlanId = previousClientPlanId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.agreedPrice = agreedPrice;
        this.goal = goal;
        this.cancelledAt = cancelledAt;
        this.cancellationReason = cancellationReason;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    get id() {
        return this.#id;
    }

    get clientId() {
        return this.#clientId;
    }

    set clientId(value) {
        this.#clientId = value;
    }

    get trainingPlanId() {
        return this.#trainingPlanId;
    }

    set trainingPlanId(value) {
        this.#trainingPlanId = value;
    }

    get previousClientPlanId() {
        return this.#previousClientPlanId;
    }

    set previousClientPlanId(value) {
        this.#previousClientPlanId = value;
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

    get agreedPrice() {
        return this.#agreedPrice;
    }

    set agreedPrice(value) {
        this.#agreedPrice = value;
    }

    get goal() {
        return this.#goal;
    }

    set goal(value) {
        this.#goal = value;
    }

    get cancelledAt() {
        return this.#cancelledAt;
    }

    set cancelledAt(value) {
        this.#cancelledAt = value;
    }

    get cancellationReason() {
        return this.#cancellationReason;
    }

    set cancellationReason(value) {
        this.#cancellationReason = value;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }
}