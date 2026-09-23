import { ProgressRecordRepository } from "../repositories/ProgressRecordRepository.js";

export class ProgressRecordService {

    static async create(progressRecord) {
        return await ProgressRecordRepository.create(progressRecord);
    }

    static async findById(id) {
        return await ProgressRecordRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return await ProgressRecordRepository.findByClientPlanId(clientPlanId);
    }

    static async findByClientPlanAndDate(clientPlanId, recordDate) {
        return await ProgressRecordRepository.findByClientPlanAndDate(
            clientPlanId,
            recordDate
        );
    }

    static async findAll() {
        return await ProgressRecordRepository.findAll();
    }
}