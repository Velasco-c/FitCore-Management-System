import { TrainingPlan } from "../models/TrainingPlan.js";
import { TrainingPlanRepository } from "../repositories/TrainingPlanRepository.js";
import { TrainingPlanValidator } from "../validators/TrainingPlanValidator.js";

export class TrainingPlanService {

    static async create(data) {
        const validatedData = TrainingPlanValidator.validateCreate(data);
        const trainingPlan = new TrainingPlan(validatedData);
        return TrainingPlanRepository.create(trainingPlan);
    }

    static async findById(id) {
        return TrainingPlanRepository.findById(id);
    }

    static async findByName(name) {
        return TrainingPlanRepository.findByName(name);
    }

    static async findAll() {
        return TrainingPlanRepository.findAll();
    }

    static async update(id, data) {
        const validatedData = TrainingPlanValidator.validateUpdate(data);
        const trainingPlan = new TrainingPlan(validatedData);
        return TrainingPlanRepository.update(id, trainingPlan);
    }

    static async deactivate(id) {
        return TrainingPlanRepository.deactivate(id);
    }
}