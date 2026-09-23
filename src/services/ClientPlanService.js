import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";

export class ClientPlanService {

    static async create(clientPlan) {
        return await ClientPlanRepository.create(clientPlan);
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