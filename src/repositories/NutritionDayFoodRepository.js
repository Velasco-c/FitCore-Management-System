import pool from "../database/connection.js";
import { NutritionDayFood } from "../models/NutritionDayFood.js";
import { nutritionDayFoodQueries } from "../queries/nutritionDayFoodQueries.js";

const mapRowToNutritionDayFood = (row) => new NutritionDayFood({
    id: row.id,
    nutritionDayId: row.nutrition_day_id,
    foodId: row.food_id,
    mealType: row.meal_type,
    quantity: row.quantity,
    estimatedCalories: row.estimated_calories,
    notes: row.notes
});

export class NutritionDayFoodRepository {
    static async create(nutritionDayFood, connection = pool) {
        const [result] = await connection.execute(
            nutritionDayFoodQueries.create,
            [
                nutritionDayFood.nutritionDayId,
                nutritionDayFood.foodId,
                nutritionDayFood.mealType,
                nutritionDayFood.quantity,
                nutritionDayFood.estimatedCalories,
                nutritionDayFood.notes
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            nutritionDayFoodQueries.findById,
            [id]
        );

        return rows[0]
            ? mapRowToNutritionDayFood(rows[0])
            : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            nutritionDayFoodQueries.findAll
        );

        return rows.map(mapRowToNutritionDayFood);
    }

    static async findByNutritionDayId(
        nutritionDayId,
        connection = pool
    ) {
        const [rows] = await connection.execute(
            nutritionDayFoodQueries.findByNutritionDayId,
            [nutritionDayId]
        );

        return rows.map(mapRowToNutritionDayFood);
    }

    static async findByFoodId(foodId, connection = pool) {
        const [rows] = await connection.execute(
            nutritionDayFoodQueries.findByFoodId,
            [foodId]
        );

        return rows.map(mapRowToNutritionDayFood);
    }

    static async update(id, nutritionDayFood, connection = pool) {
        const [result] = await connection.execute(
            nutritionDayFoodQueries.update,
            [
                nutritionDayFood.foodId,
                nutritionDayFood.mealType,
                nutritionDayFood.quantity,
                nutritionDayFood.estimatedCalories,
                nutritionDayFood.notes,
                id
            ]
        );

        return result.affectedRows;
    }
}