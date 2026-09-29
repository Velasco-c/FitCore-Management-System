import { NutritionPlanService } from '../services/NutritionPlanService.js';
import { NutritionPlanValidator } from '../validators/NutritionPlanValidator.js';

export async function createNutritionPlan(data) {
    const validatedData = NutritionPlanValidator.validateCreate(data);
    return NutritionPlanService.create(validatedData);
}

export async function findNutritionPlanById(id) {
    NutritionPlanValidator.validateId(id, "id");
    return NutritionPlanService.findById(id);
}

export async function findAllNutritionPlans() {
    return NutritionPlanService.findAll();
}

export async function findNutritionPlansByClientPlan(clientPlanId) {
    NutritionPlanValidator.validateId(clientPlanId, "clientPlanId");
    return NutritionPlanService.findByClientPlanId(clientPlanId);
}

export async function updateNutritionPlan(id, data) {
    NutritionPlanValidator.validateId(id, "id");
    const validatedData = NutritionPlanValidator.validateUpdate(data);
    return NutritionPlanService.update(id, validatedData);
}

export async function updateNutritionPlanStatus(id, status) {
    NutritionPlanValidator.validateId(id, "id");
    NutritionPlanValidator.validateStatus(status);
    return NutritionPlanService.updateStatus(id, status);
}
