import { NutritionDayFood } from "../models/NutritionDayFood.js";
import { NutritionDayFoodRepository } from "../repositories/NutritionDayFoodRepository.js";
import { NutritionDayFoodValidator } from "../validators/NutritionDayFoodValidator.js";

export class NutritionDayFoodService {

    static async create(data) {
        const validatedData = NutritionDayFoodValidator.validateCreate(data);
        const nutritionDayFood = new NutritionDayFood(validatedData);
        return NutritionDayFoodRepository.create(nutritionDayFood);
    }

    static async findById(id) {
        return NutritionDayFoodRepository.findById(id);
    }

    static async findByNutritionDayId(nutritionDayId) {
        return NutritionDayFoodRepository.findByNutritionDayId(
            nutritionDayId
        );
    }

    static async findByFoodId(foodId) {
        return NutritionDayFoodRepository.findByFoodId(foodId);
    }

    static async findAll() {
        return NutritionDayFoodRepository.findAll();
    }

    static async update(id, data) {
        const validatedData = NutritionDayFoodValidator.validateUpdate(data);
        const nutritionDayFood = new NutritionDayFood(validatedData);
        return NutritionDayFoodRepository.update(id, nutritionDayFood);
    }
}