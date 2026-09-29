import { NutritionDayFoodService } from '../services/NutritionDayFoodService.js';
import { NutritionDayFoodValidator } from '../validators/NutritionDayFoodValidator.js';

export async function createNutritionDayFood(data) {
    const validatedData = NutritionDayFoodValidator.validateCreate(data);
    return NutritionDayFoodService.create(validatedData);
}

export async function findNutritionDayFoodById(id) {
    NutritionDayFoodValidator.validateId(id, "id");
    return NutritionDayFoodService.findById(id);
}

export async function findNutritionDayFoods(nutritionDayId) {
    NutritionDayFoodValidator.validateId(nutritionDayId, "nutritionDayId");
    return NutritionDayFoodService.findByDay(nutritionDayId);
}

export async function findAllNutritionDayFoods() {
    return NutritionDayFoodService.findAll();
}

export async function updateNutritionDayFood(id, data) {
    NutritionDayFoodValidator.validateId(id, "id");
    const validatedData = NutritionDayFoodValidator.validateUpdate(data);
    return NutritionDayFoodService.update(id, validatedData);
}

export async function deleteNutritionDayFood(id) {
    NutritionDayFoodValidator.validateId(id, "id");
    return NutritionDayFoodService.delete(id);
}

export async function findNutritionDayFoodsByNutritionDayId(nutritionDayId) {
    NutritionDayFoodValidator.validateId(nutritionDayId, "nutritionDayId");
    return NutritionDayFoodService.findByNutritionDayId(nutritionDayId);
}

export async function findNutritionDayFoodsByFoodId(foodId) {
    NutritionDayFoodValidator.validateId(foodId, "foodId");
    return NutritionDayFoodService.findByFoodId(foodId);
}
