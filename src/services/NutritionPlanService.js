import { NutritionPlan } from "../models/NutritionPlan.js";
import { NutritionPlanRepository } from "../repositories/NutritionPlanRepository.js";
import { NutritionPlanValidator } from "../validators/NutritionPlanValidator.js";

export class NutritionPlanService {

    static async create(data) {
        const validatedData = NutritionPlanValidator.validateCreate(data);
        const nutritionPlan = new NutritionPlan(validatedData);
        return NutritionPlanRepository.create(nutritionPlan);
    }

    static async findById(id) {
        return NutritionPlanRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return NutritionPlanRepository.findByClientPlanId(clientPlanId);
    }

    static async findAll() {
        return NutritionPlanRepository.findAll();
    }

    static async update(id, data) {
        const validatedData = NutritionPlanValidator.validateUpdate(data);
        const nutritionPlan = new NutritionPlan(validatedData);
        return NutritionPlanRepository.update(id, nutritionPlan);
    }

    static async updateStatus(id, status) {
        return NutritionPlanRepository.updateStatus(id, status);
    }
}