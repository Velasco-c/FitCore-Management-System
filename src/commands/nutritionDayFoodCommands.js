import { NutritionDayFoodService } from '../services/NutritionDayFoodService.js';

export async function createNutritionDayFood(data) {
    return NutritionDayFoodService.create(data);
}

export async function findNutritionDayFoodById(id) {
    return NutritionDayFoodService.findById(id);
}

export async function findNutritionDayFoods(nutritionDayId) {
    return NutritionDayFoodService.findByDay(nutritionDayId);
}

export async function findAllNutritionDayFoods() {
    return NutritionDayFoodService.findAll();
}

export async function updateNutritionDayFood(id, data) {
    return NutritionDayFoodService.update(id, data);
}

export async function deleteNutritionDayFood(id) {
    return NutritionDayFoodService.delete(id);
}

export async function findNutritionDayFoodsByNutritionDayId(
    nutritionDayId
) {
    return NutritionDayFoodService.findByNutritionDayId(
        nutritionDayId
    );
}

export async function findNutritionDayFoodsByFoodId(
    foodId
) {
    return NutritionDayFoodService.findByFoodId(
        foodId
    );
}