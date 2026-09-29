import { FoodService } from '../services/FoodService.js';
import { FoodValidator } from '../validators/FoodValidator.js';

export async function createFood(data) {
    const validatedData = FoodValidator.validateCreate(data);
    return FoodService.create(validatedData);
}

export async function findFoodById(id) {
    FoodValidator.validateId(id, "id");
    return FoodService.findById(id);
}

export async function findAllFoods() {
    return FoodService.findAll();
}

export async function updateFood(id, data) {
    FoodValidator.validateId(id, "id");
    const validatedData = FoodValidator.validateUpdate(data);
    return FoodService.update(id, validatedData);
}

export async function deactivateFood(id) {
    FoodValidator.validateId(id, "id");
    return FoodService.deactivate(id);
}

export async function findFoodByName(name) {
    FoodValidator.validateName(name);
    return FoodService.findByName(name.trim());
}
