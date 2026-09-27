import { TrainingPlanService } from '../services/TrainingPlanService.js';

export async function createTrainingPlan(data) {
    return TrainingPlanService.create(data);
}

export async function findTrainingPlanById(id) {
    return TrainingPlanService.findById(id);
}

export async function findTrainingPlanByName(name) {
    return TrainingPlanService.findByName(name);
}

export async function findAllTrainingPlans() {
    return TrainingPlanService.findAll();
}

export async function updateTrainingPlan(id, data) {
    return TrainingPlanService.update(id, data);
}

export async function deactivateTrainingPlan(id) {
    return TrainingPlanService.deactivate(id);
}