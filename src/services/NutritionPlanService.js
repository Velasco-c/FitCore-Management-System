import { NutritionPlan } from "../models/NutritionPlan.js";
import { NutritionPlanRepository } from "../repositories/NutritionPlanRepository.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { NutritionPlanValidator } from "../validators/NutritionPlanValidator.js";

export class NutritionPlanService {

    static async create(data) {
        const validatedData =
            NutritionPlanValidator.validateCreate(data);
        const clientPlan =
            await ClientPlanRepository.findById(
                validatedData.clientPlanId
            );
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
        const nutritionPlan =
            new NutritionPlan(validatedData);
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
        const validatedData =
            NutritionPlanValidator.validateUpdate(data);
        const nutritionPlan =
            new NutritionPlan(validatedData);
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