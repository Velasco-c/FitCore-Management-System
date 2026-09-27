export class ProgressRecord {
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
        this.id = id;
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
        this.createdAt = createdAt;
    }
}