export class ProgressRecord {
    #id;
    #clientPlanId;
    #recordDate;
    #weightKg;
    #bodyFatPercentage;
    #waistCm;
    #chestCm;
    #armCm;
    #legCm;
    #photoUrl;
    #comments;
    #createdAt;

    constructor({
        id = null,
        clientPlanId = null,
        recordDate = null,
        weightKg = null,
        bodyFatPercentage = null,
        waistCm = null,
        chestCm = null,
        armCm = null,
        legCm = null,
        photoUrl = null,
        comments = null,
        createdAt = null
    } = {}) {
        this.#id = id;
        this.clientPlanId = clientPlanId;
        this.recordDate = recordDate;
        this.weightKg = weightKg;
        this.bodyFatPercentage = bodyFatPercentage;
        this.waistCm = waistCm;
        this.chestCm = chestCm;
        this.armCm = armCm;
        this.legCm = legCm;
        this.photoUrl = photoUrl;
        this.comments = comments;
        this.#createdAt = createdAt;
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

    get recordDate() {
        return this.#recordDate;
    }

    set recordDate(value) {
        this.#recordDate = value;
    }

    get weightKg() {
        return this.#weightKg;
    }

    set weightKg(value) {
        this.#weightKg = value;
    }

    get bodyFatPercentage() {
        return this.#bodyFatPercentage;
    }

    set bodyFatPercentage(value) {
        this.#bodyFatPercentage = value;
    }

    get waistCm() {
        return this.#waistCm;
    }

    set waistCm(value) {
        this.#waistCm = value;
    }

    get chestCm() {
        return this.#chestCm;
    }

    set chestCm(value) {
        this.#chestCm = value;
    }

    get armCm() {
        return this.#armCm;
    }

    set armCm(value) {
        this.#armCm = value;
    }

    get legCm() {
        return this.#legCm;
    }

    set legCm(value) {
        this.#legCm = value;
    }

    get photoUrl() {
        return this.#photoUrl;
    }

    set photoUrl(value) {
        this.#photoUrl = value;
    }

    get comments() {
        return this.#comments;
    }

    set comments(value) {
        this.#comments = value;
    }

    get createdAt() {
        return this.#createdAt;
    }
}