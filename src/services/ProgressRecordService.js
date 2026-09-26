import { ProgressRecord } from "../models/ProgressRecord.js";
import { ProgressRecordRepository } from "../repositories/ProgressRecordRepository.js";
import { ProgressRecordValidator } from "../validators/ProgressRecordValidator.js";

export class ProgressRecordService {

    static async create(data) {
        const validatedData = ProgressRecordValidator.validateCreate(data);
        const progressRecord = new ProgressRecord(validatedData);
        return ProgressRecordRepository.create(progressRecord);
    }

    static async findById(id) {
        return ProgressRecordRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return ProgressRecordRepository.findByClientPlanId(clientPlanId);
    }

    static async findByClientPlanAndDate(clientPlanId, recordDate) {
        return ProgressRecordRepository.findByClientPlanAndDate(
            clientPlanId,
            recordDate
        );
    }

    static async findAll() {
        return ProgressRecordRepository.findAll();
    }
}