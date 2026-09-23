import { FoodRepository } from "../repositories/FoodRepository.js";

export class FoodService {

    static async create(food) {
        return await FoodRepository.create(food);
    }

    static async findById(id) {
        return await FoodRepository.findById(id);
    }

    static async findByName(name) {
        return await FoodRepository.findByName(name);
    }

    static async findAll() {
        return await FoodRepository.findAll();
    }

    static async update(id, food) {
        return await FoodRepository.update(id, food);
    }
}