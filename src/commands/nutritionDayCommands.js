import { NutritionDayService } from '../services/NutritionDayService.js';

export async function createNutritionDay(data) {
    return NutritionDayService.create(data);
}

export async function findNutritionDayById(id) {
    return NutritionDayService.findById(id);
}

export async function findAllNutritionDays() {
    return NutritionDayService.findAll();
}

export async function findNutritionDayByPlanAndDate(
    nutritionPlanId,
    dayDate
) {
    return NutritionDayService.findByPlanAndDate(
        nutritionPlanId,
        dayDate
    );
}

export async function updateNutritionDay(id, data) {
    return NutritionDayService.update(id, data);
}

export async function findNutritionDaysByNutritionPlanId(
    nutritionPlanId
) {
    return NutritionDayService.findByNutritionPlanId(
        nutritionPlanId
    );
}