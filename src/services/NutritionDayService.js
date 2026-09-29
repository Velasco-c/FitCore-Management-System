import { NutritionDay } from "../models/NutritionDay.js";

import { NutritionDayRepository } from "../repositories/NutritionDayRepository.js";

import { NutritionPlanRepository } from "../repositories/NutritionPlanRepository.js";

export class NutritionDayService {

    static async create(data) {
        const nutritionPlan =
            await NutritionPlanRepository.findById(
                data.nutritionPlanId
            );
        if (!nutritionPlan) {
            throw new Error(
                "El plan nutricional no existe."
            );
        }
        const nutritionDay =
            new NutritionDay(data);
        return NutritionDayRepository.create(
            nutritionDay
        );
    }

    static async findById(id) {
        return NutritionDayRepository.findById(id);
    }

    static async findAll() {
        return NutritionDayRepository.findAll();
    }

    static async findByNutritionPlanId(nutritionPlanId) {
        return NutritionDayRepository.findByNutritionPlanId(
            nutritionPlanId
        );
    }

    static async findByPlanAndDate(
        nutritionPlanId,
        dayDate
    ) {

        return NutritionDayRepository.findByPlanAndDate(
            nutritionPlanId,
            dayDate
        );
    }

    static async update(id, data) {
        const existingDay =
            await NutritionDayRepository.findById(id);
        if (!existingDay) {
            throw new Error(
                "El día nutricional no existe."
            );
        }
        const nutritionDay =
            new NutritionDay({
                ...data,
                nutritionPlanId: existingDay.nutritionPlanId
            });
        return NutritionDayRepository.update(
            id,
            nutritionDay
        );
    }
}