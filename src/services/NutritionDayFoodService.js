import { NutritionDayFood } from "../models/NutritionDayFood.js";
import { NutritionDayFoodRepository } from "../repositories/NutritionDayFoodRepository.js";
import { NutritionDayRepository } from "../repositories/NutritionDayRepository.js";
import { FoodRepository } from "../repositories/FoodRepository.js";
import { NutritionDayFoodValidator } from "../validators/NutritionDayFoodValidator.js";

export class NutritionDayFoodService {

    static async create(data) {
        const validatedData =
            NutritionDayFoodValidator.validateCreate(data);
        const nutritionDay =
            await NutritionDayRepository.findById(
                validatedData.nutritionDayId
            );
        if (!nutritionDay) {
            throw new Error(
                "El día nutricional no existe."
            );
        }

        const food =
            await FoodRepository.findById(
                validatedData.foodId
            );

        if (!food) {
            throw new Error(
                "El alimento no existe."
            );
        }
        if (food.status !== "ACTIVE") {
            throw new Error(
                "El alimento está inactivo."
            );
        }

        const nutritionDayFood =
            new NutritionDayFood(validatedData);
        return NutritionDayFoodRepository.create(
            nutritionDayFood
        );
    }

    static async findById(id) {
        return NutritionDayFoodRepository.findById(id);
    }

    static async findByDay(nutritionDayId) {
        return NutritionDayFoodRepository.findByDay(
            nutritionDayId
        );
    }

    static async findByNutritionDayId(nutritionDayId) {
    return NutritionDayFoodRepository.findByNutritionDayId(
        nutritionDayId
    );
    }

    static async findByFoodId(foodId) {
        return NutritionDayFoodRepository.findByFoodId(
            foodId
        );
    }

    static async findAll() {
        return NutritionDayFoodRepository.findAll();
    }

    static async update(id, data) {
    const existingRelation =
        await NutritionDayFoodRepository.findById(id);

    if (!existingRelation) {
        throw new Error(
            "La relación alimento-día no existe."
        );
    }

    const validatedData =
        NutritionDayFoodValidator.validateUpdate({
            ...data,
            nutritionDayId: existingRelation.nutritionDayId
        });

    const food =
        await FoodRepository.findById(
            validatedData.foodId
        );

    if (!food) {
        throw new Error(
            "El alimento no existe."
        );
    }

    if (food.status !== "ACTIVE") {
        throw new Error(
            "El alimento está inactivo."
        );
    }

    const nutritionDayFood =
        new NutritionDayFood({
            ...validatedData,
            nutritionDayId: existingRelation.nutritionDayId
        });

    return NutritionDayFoodRepository.update(
        id,
        nutritionDayFood
    );
    }

    static async delete(id) {
        const existingRelation =
            await NutritionDayFoodRepository.findById(id);
        if (!existingRelation) {
            throw new Error(
                "La relación alimento-día no existe."
            );
        }

        return NutritionDayFoodRepository.delete(id);
    }
}