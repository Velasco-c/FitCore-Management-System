import { FoodService } from '../services/FoodService.js';

export async function createFood(data) {
    return FoodService.create(data);
}

export async function findFoodById(id) {
    return FoodService.findById(id);
}

export async function findAllFoods() {
    return FoodService.findAll();
}

export async function updateFood(id, data) {
    return FoodService.update(id, data);
}

export async function deactivateFood(id) {
    return FoodService.deactivate(id);
}