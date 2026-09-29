import { NutritionDayService } from '../services/NutritionDayService.js';
import { NutritionDayValidator } from '../validators/NutritionDayValidator.js';

export async function createNutritionDay(data) {
    const validatedData = NutritionDayValidator.validateCreate(data);
    return NutritionDayService.create(validatedData);
}

export async function findNutritionDayById(id) {
    NutritionDayValidator.validateId(id, "id");
    return NutritionDayService.findById(id);
}

export async function findAllNutritionDays() {
    return NutritionDayService.findAll();
}

export async function findNutritionDayByPlanAndDate(
    nutritionPlanId,
    dayDate
) {
    NutritionDayValidator.validateId(nutritionPlanId, "nutritionPlanId");
    NutritionDayValidator.validateDate(dayDate, "dayDate");
    return NutritionDayService.findByPlanAndDate(
        nutritionPlanId,
        dayDate
    );
}

export async function updateNutritionDay(id, data) {
    NutritionDayValidator.validateId(id, "id");
    const validatedData = NutritionDayValidator.validateUpdate(data);
    return NutritionDayService.update(id, validatedData);
}

export async function findNutritionDaysByNutritionPlanId(
    nutritionPlanId
) {
    NutritionDayValidator.validateId(nutritionPlanId, "nutritionPlanId");
    return NutritionDayService.findByNutritionPlanId(
        nutritionPlanId
    );
}
