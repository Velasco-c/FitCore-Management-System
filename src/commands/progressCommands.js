import { ProgressRecordService } from '../services/ProgressRecordService.js';

export async function createProgressRecord(data) {
    return ProgressRecordService.create(data);
}

export async function findProgressRecordById(id) {
    return ProgressRecordService.findById(id);
}

export async function findProgressRecordByClientPlanAndDate(
    clientPlanId,
    recordDate
) {
    return ProgressRecordService.findByClientPlanAndDate(
        clientPlanId,
        recordDate
    );
}

export async function findAllProgressRecords() {
    return ProgressRecordService.findAll();
}

export async function updateProgressRecord(id, data) {
    return ProgressRecordService.update(id, data);
}

export async function findProgressRecordsByClientPlanId(
    clientPlanId
) {
    return ProgressRecordService.findByClientPlanId(
        clientPlanId
    );
}