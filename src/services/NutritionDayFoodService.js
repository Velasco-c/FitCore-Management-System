import { NutritionDayFoodRepository } from "../repositories/NutritionDayFoodRepository.js";

export class NutritionDayFoodService {

    static async create(nutritionDayFood) {
        return await NutritionDayFoodRepository.create(nutritionDayFood);
    }

    static async findById(id) {
        return await NutritionDayFoodRepository.findById(id);
    }

    static async findByNutritionDayId(nutritionDayId) {
        return await NutritionDayFoodRepository.findByNutritionDayId(
            nutritionDayId
        );
    }

    static async findByFoodId(foodId) {
        return await NutritionDayFoodRepository.findByFoodId(foodId);
    }

    static async findAll() {
        return await NutritionDayFoodRepository.findAll();
    }

    static async update(id, nutritionDayFood) {
        return await NutritionDayFoodRepository.update(
            id,
            nutritionDayFood
        );
    }
}