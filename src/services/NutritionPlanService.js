import { NutritionPlanRepository } from "../repositories/NutritionPlanRepository.js";

export class NutritionPlanService {

    static async create(nutritionPlan) {
        return await NutritionPlanRepository.create(nutritionPlan);
    }

    static async findById(id) {
        return await NutritionPlanRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return await NutritionPlanRepository.findByClientPlanId(clientPlanId);
    }

    static async findAll() {
        return await NutritionPlanRepository.findAll();
    }

    static async update(id, nutritionPlan) {
        return await NutritionPlanRepository.update(id, nutritionPlan);
    }

    static async updateStatus(id, status) {
        return await NutritionPlanRepository.updateStatus(id, status);
    }
}