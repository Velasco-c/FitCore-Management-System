import { NutritionPlan } from "../models/NutritionPlan.js";
import { NutritionPlanRepository } from "../repositories/NutritionPlanRepository.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";

export class NutritionPlanService {

    static async create(data) {
        const clientPlan =
            await ClientPlanRepository.findById(data.clientPlanId);
        if (!clientPlan) {
            throw new Error(
                "La asignación del plan no existe."
            );
        }
        if (clientPlan.status === "CANCELLED") {
            throw new Error(
                "No se puede crear un plan nutricional para una asignación cancelada."
            );
        }
        const nutritionPlan = new NutritionPlan(data);
        return NutritionPlanRepository.create(
            nutritionPlan
        );
    }

    static async findById(id) {
        return NutritionPlanRepository.findById(id);
    }

    static async findAll() {
        return NutritionPlanRepository.findAll();
    }

    static async findByClientPlanId(clientPlanId) {
        return NutritionPlanRepository.findByClientPlanId(
            clientPlanId
        );
    }

    static async update(id, data) {
        const existingPlan =
            await NutritionPlanRepository.findById(id);
        if (!existingPlan) {
            throw new Error(
                "El plan nutricional no existe."
            );
        }
        const nutritionPlan = new NutritionPlan(data);
        return NutritionPlanRepository.update(
            id,
            nutritionPlan
        );
    }

    static async updateStatus(id, status) {
        const existingPlan =
            await NutritionPlanRepository.findById(id);
        if (!existingPlan) {
            throw new Error(
                "El plan nutricional no existe."
            );
        }
        return NutritionPlanRepository.updateStatus(
            id,
            status
        );
    }
}