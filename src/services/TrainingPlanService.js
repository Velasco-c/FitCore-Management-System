import { TrainingPlanRepository } from "../repositories/TrainingPlanRepository.js";

export class TrainingPlanService {

    static async create(trainingPlan) {
        return await TrainingPlanRepository.create(trainingPlan);
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