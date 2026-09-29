import { TrainingPlanService } from '../services/TrainingPlanService.js';
import { TrainingPlanValidator } from '../validators/TrainingPlanValidator.js';

export async function createTrainingPlan(data) {
    const validatedData = TrainingPlanValidator.validateCreate(data);
    return TrainingPlanService.create(validatedData);
}

export async function findTrainingPlanById(id) {
    TrainingPlanValidator.validateId(id, "id");
    return TrainingPlanService.findById(id);
}

export async function findTrainingPlanByName(name) {
    TrainingPlanValidator.validateName(name);
    return TrainingPlanService.findByName(name.trim());
}

export async function findAllTrainingPlans() {
    return TrainingPlanService.findAll();
}

export async function updateTrainingPlan(id, data) {
    TrainingPlanValidator.validateId(id, "id");
    const validatedData = TrainingPlanValidator.validateUpdate(data);
    return TrainingPlanService.update(id, validatedData);
}

export async function deactivateTrainingPlan(id) {
    TrainingPlanValidator.validateId(id, "id");
    return TrainingPlanService.deactivate(id);
}
