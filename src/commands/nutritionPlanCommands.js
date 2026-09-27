import { NutritionPlanService } from '../services/NutritionPlanService.js';

export async function createNutritionPlan(data) {
    return NutritionPlanService.create(data);
}

export async function findNutritionPlanById(id) {
    return NutritionPlanService.findById(id);
}

export async function findAllNutritionPlans() {
    return NutritionPlanService.findAll();
}

export async function findNutritionPlansByClientPlan(clientPlanId) {
    return NutritionPlanService.findByClientPlanId(clientPlanId);
}

export async function updateNutritionPlan(id, data) {
    return NutritionPlanService.update(id, data);
}

export async function updateNutritionPlanStatus(id, status) {
    return NutritionPlanService.updateStatus(id, status);
}