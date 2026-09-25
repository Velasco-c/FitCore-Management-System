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
        return await TrainingPlanRepository.findById(id);
    }

    static async findByName(name) {
        return await TrainingPlanRepository.findByName(name);
    }

    static async findAll() {
        return await TrainingPlanRepository.findAll();
    }

    static async update(id, trainingPlan) {
        return await TrainingPlanRepository.update(id, trainingPlan);
    }
}