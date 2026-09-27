import { ClientPlanService } from '../services/ClientPlanService.js';

export async function createClientPlan(data) {
    return ClientPlanService.create(data);
}

export async function findClientPlanById(id) {
    return ClientPlanService.findById(id);
}

export async function findClientPlansByClientId(clientId) {
    return ClientPlanService.findByClientId(clientId);
}

export async function findActiveClientPlan(clientId) {
    return ClientPlanService.findActiveByClientId(clientId);
}

export async function findAllClientPlans() {
    return ClientPlanService.findAll();
}

export async function updateClientPlan(id, data) {
    return ClientPlanService.update(id, data);
}

export async function cancelClientPlan(
    id,
    cancelledAt,
    cancellationReason
) {
    return ClientPlanService.cancel(
        id,
        cancelledAt,
        cancellationReason
    );
}