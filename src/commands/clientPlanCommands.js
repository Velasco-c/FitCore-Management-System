import { ClientPlanService } from '../services/ClientPlanService.js';
import { ClientPlanValidator } from '../validators/ClientPlanValidator.js';

export async function createClientPlan(data) {
    const validatedData = ClientPlanValidator.validateCreate(data);
    return ClientPlanService.create(
        validatedData,
        data.conditions
    );
}

export async function findClientPlanById(id) {
    ClientPlanValidator.validateId(id, "id");
    return ClientPlanService.findById(id);
}

export async function findClientPlansByClientId(clientId) {
    ClientPlanValidator.validateId(clientId, "clientId");
    return ClientPlanService.findByClientId(clientId);
}

export async function findActiveClientPlan(clientId) {
    ClientPlanValidator.validateId(clientId, "clientId");
    return ClientPlanService.findActiveByClientId(clientId);
}

export async function findAllClientPlans() {
    return ClientPlanService.findAll();
}

export async function updateClientPlan(id, data) {
    ClientPlanValidator.validateId(id, "id");
    const validatedData = ClientPlanValidator.validateUpdate(data);
    return ClientPlanService.update(id, validatedData);
}

export async function cancelClientPlan(
    id,
    cancelledAt,
    cancellationReason
) {
    ClientPlanValidator.validateId(id, "id");
    ClientPlanValidator.validateCancellation(
        cancelledAt,
        cancellationReason
    );
    return ClientPlanService.cancel(
        id,
        cancelledAt,
        cancellationReason.trim()
    );
}
