import { Food } from "../models/Food.js";
import { FoodRepository } from "../repositories/FoodRepository.js";
import { FoodValidator } from "../validators/FoodValidator.js";

export class FoodService {

    static async create(data) {
        const validatedData = FoodValidator.validateCreate(data);
        const food = new Food(validatedData);
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
        const validatedData = FoodValidator.validateUpdate(data);
        const food = new Food(validatedData);
        return FoodRepository.update(id, food);
    }
}