import { ProgressRecordService } from '../services/ProgressRecordService.js';
import { ProgressRecordValidator } from '../validators/ProgressRecordValidator.js';

export async function createProgressRecord(data) {
    const validatedData = ProgressRecordValidator.validateCreate(data);
    return ProgressRecordService.create(validatedData);
}

export async function findProgressRecordById(id) {
    ProgressRecordValidator.validateId(id, "id");
    return ProgressRecordService.findById(id);
}

export async function findProgressRecordByClientPlanAndDate(
    clientPlanId,
    recordDate
) {
    ProgressRecordValidator.validateId(clientPlanId, "clientPlanId");
    ProgressRecordValidator.validateDate(recordDate, "recordDate");
    return ProgressRecordService.findByClientPlanAndDate(
        clientPlanId,
        recordDate
    );
}

export async function findAllProgressRecords() {
    return ProgressRecordService.findAll();
}

export async function updateProgressRecord(id, data) {
    ProgressRecordValidator.validateId(id, "id");
    const validatedData = ProgressRecordValidator.validateUpdate(data);
    return ProgressRecordService.update(id, validatedData);
}

export async function findProgressRecordsByClientPlanId(clientPlanId) {
    ProgressRecordValidator.validateId(clientPlanId, "clientPlanId");
    return ProgressRecordService.findByClientPlanId(clientPlanId);
}
