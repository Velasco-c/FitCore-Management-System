import { NutritionDay } from "../models/NutritionDay.js";
import { NutritionDayRepository } from "../repositories/NutritionDayRepository.js";
import { NutritionPlanRepository } from "../repositories/NutritionPlanRepository.js";
import { NutritionDayValidator } from "../validators/NutritionDayValidator.js";

export class NutritionDayService {

    static async create(data) {
        const validatedData =
            NutritionDayValidator.validateCreate(data);
        const nutritionPlan =
            await NutritionPlanRepository.findById(
                validatedData.nutritionPlanId
            );
        if (!nutritionPlan) {
            throw new Error(
                "El plan nutricional no existe."
            );
        }
        const nutritionDay =
            new NutritionDay(validatedData);
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
        const validatedData =
            NutritionDayValidator.validateUpdate(data);
        const nutritionDay =
            new NutritionDay(validatedData);
        return NutritionDayRepository.update(
            id,
            nutritionDay
        );
    }
}