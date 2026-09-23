import pool from "../database/connection.js";
import { Food } from "../models/Food.js";
import { foodQueries } from "../queries/foodQueries.js";

const mapRowToFood = (row) => new Food({
    id: row.id,
    name: row.name,
    caloriesPer100g: row.calories_per_100g,
    unit: row.unit,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export class FoodRepository {
    static async create(food, connection = pool) {
        const [result] = await connection.execute(
            foodQueries.create,
            [
                food.name,
                food.caloriesPer100g,
                food.unit
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            foodQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToFood(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            foodQueries.findAll
        );

        return rows.map(mapRowToFood);
    }

    static async findByName(name, connection = pool) {
        const [rows] = await connection.execute(
            foodQueries.findByName,
            [name]
        );

        return rows[0] ? mapRowToFood(rows[0]) : null;
    }

    static async update(id, food, connection = pool) {
        const [result] = await connection.execute(
            foodQueries.update,
            [
                food.name,
                food.caloriesPer100g,
                food.unit,
                id
            ]
        );

        return result.affectedRows;
    }

    static async deactivate(id, connection = pool) {
        const [result] = await connection.execute(
            foodQueries.deactivate,
            [id]
        );

        return result.affectedRows;
    }
}