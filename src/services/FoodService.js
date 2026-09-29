import { Food } from "../models/Food.js";
import { FoodRepository } from "../repositories/FoodRepository.js";

export class FoodService {

    static async create(data) {
        const food = new Food(data);
        return FoodRepository.create(food);
    }

    static async findById(id) {
        return FoodRepository.findById(id);
    }

    static async findByName(name) {
        return FoodRepository.findByName(name);
    }

    static async findAll() {
        return FoodRepository.findAll();
    }

    static async update(id, data) {
        const existingFood =
            await FoodRepository.findById(id);

        if (!existingFood) {
            throw new Error(
                "El alimento no existe."
            );
        }

        const food = new Food(data);

        return FoodRepository.update(id, food);
    }

    static async deactivate(id) {
        const existingFood =
            await FoodRepository.findById(id);
        if (!existingFood) {
            throw new Error(
                "El alimento no existe."
            );
        }
        if (existingFood.status === "INACTIVE") {
            throw new Error(
                "El alimento ya está inactivo."
            );
        }
        return FoodRepository.deactivate(id);
    }
}