import { NutritionDay } from "../models/NutritionDay.js";
import { NutritionDayRepository } from "../repositories/NutritionDayRepository.js";
import { NutritionDayValidator } from "../validators/NutritionDayValidator.js";

export class NutritionDayService {

    static async create(data) {
        const validatedData = NutritionDayValidator.validateCreate(data);
        const nutritionDay = new NutritionDay(validatedData);

        return NutritionDayRepository.create(nutritionDay);
    }

    static async findById(id) {
        return NutritionDayRepository.findById(id);
    }

    static async findByNutritionPlanId(nutritionPlanId) {
        return NutritionDayRepository.findByNutritionPlanId(nutritionPlanId);
    }

    static async findByPlanAndDate(nutritionPlanId, dayDate) {
        return NutritionDayRepository.findByPlanAndDate(
            nutritionPlanId,
            dayDate
        );
    }

    static async findAll() {
        return NutritionDayRepository.findAll();
    }

    static async update(id, data) {
        const validatedData = NutritionDayValidator.validateUpdate(data);
        const nutritionDay = new NutritionDay(validatedData);

        return NutritionDayRepository.update(id, nutritionDay);
    }
}