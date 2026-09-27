import { ProgressRecord } from "../models/ProgressRecord.js";
import { ProgressRecordRepository } from "../repositories/ProgressRecordRepository.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { ProgressRecordValidator } from "../validators/ProgressRecordValidator.js";

export class ProgressRecordService {

    static async create(data) {
        const validatedData =
            ProgressRecordValidator.validateCreate(data);

        const clientPlan =
            await ClientPlanRepository.findById(
                validatedData.clientPlanId
            );
        if (!clientPlan) {
            throw new Error(
                "La asignación del plan no existe."
            );
        }
        if (clientPlan.status === "CANCELLED") {
            throw new Error(
                "No se puede registrar progreso en una asignación cancelada."
            );
        }
        const existingRecord =
            await ProgressRecordRepository.findByClientPlanAndDate(
                validatedData.clientPlanId,
                validatedData.recordDate
            );
        if (existingRecord) {
            throw new Error(
                "Ya existe un registro de progreso para esa fecha."
            );
        }

        const progressRecord =
            new ProgressRecord(validatedData);
        return ProgressRecordRepository.create(
            progressRecord
        );
    }

    static async findById(id) {
        return ProgressRecordRepository.findById(id);
    }

    static async findByClientPlanAndDate(
        clientPlanId,
        recordDate
    ) {
        return ProgressRecordRepository.findByClientPlanAndDate(
            clientPlanId,
            recordDate
        );
    }
    static async findAll() {
        return ProgressRecordRepository.findAll();
    }

    static async update(id, data) {
        const existingRecord =
            await ProgressRecordRepository.findById(id);
        if (!existingRecord) {
            throw new Error(
                "El registro de progreso no existe."
            );
        }

        const validatedData =
            ProgressRecordValidator.validateUpdate(data);
        const progressRecord =
            new ProgressRecord(validatedData);
        return ProgressRecordRepository.update(
            id,
            progressRecord
        );
    }
}