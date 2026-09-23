import { NutritionDayRepository } from "../repositories/NutritionDayRepository.js";

export class NutritionDayService {

    static async create(nutritionDay) {
        return await NutritionDayRepository.create(nutritionDay);
    }

    static async findById(id) {
        return await NutritionDayRepository.findById(id);
    }

    static async findByNutritionPlanId(nutritionPlanId) {
        return await NutritionDayRepository.findByNutritionPlanId(
            nutritionPlanId
        );
    }

    static async findByPlanAndDate(nutritionPlanId, dayDate) {
        return await NutritionDayRepository.findByPlanAndDate(
            nutritionPlanId,
            dayDate
        );
    }

    static async findAll() {
        return await NutritionDayRepository.findAll();
    }

    static async update(id, nutritionDay) {
        return await NutritionDayRepository.update(id, nutritionDay);
    }
}