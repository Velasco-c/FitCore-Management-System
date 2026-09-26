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
        return ClientPlanRepository.findById(id);
    }

    static async findByClientId(clientId) {
        return ClientPlanRepository.findByClientId(clientId);
    }

    static async findActiveByClientId(clientId) {
        return ClientPlanRepository.findActiveByClientId(clientId);
    }

    static async findAll() {
        return ClientPlanRepository.findAll();
    }

    static async update(id, data) {
        const validatedData = ClientPlanValidator.validateUpdate(data);
        const clientPlan = new ClientPlan(validatedData);
        return ClientPlanRepository.update(id, clientPlan);
    }

    static async cancel(id, cancelledAt, cancellationReason) {
        return ClientPlanRepository.cancel(
            id,
            cancelledAt,
            cancellationReason
        );
    }
}