import { ClientPlan } from "../models/ClientPlan.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { ClientPlanValidator } from "../validators/ClientPlanValidator.js";

export class ClientPlanService {
    static async create(data) {
        const validatedData = ClientPlanValidator.validateCreate(data);
        const clientPlan = new ClientPlan(validatedData);
        return ClientPlanRepository.create(clientPlan);
    }

    static async findById(id) {
        return await ClientPlanRepository.findById(id);
    }

    static async findByClientId(clientId) {
        return await ClientPlanRepository.findByClientId(clientId);
    }

    static async findActiveByClientId(clientId) {
        return await ClientPlanRepository.findActiveByClientId(clientId);
    }

    static async findAll() {
        return await ClientPlanRepository.findAll();
    }

    static async update(id, clientPlan) {
        return await ClientPlanRepository.update(id, clientPlan);
    }

    static async cancel(id, cancelledAt, cancellationReason) {
        return await ClientPlanRepository.cancel(
            id,
            cancelledAt,
            cancellationReason
        );
    }
}