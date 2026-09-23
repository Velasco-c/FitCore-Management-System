import { pool } from "../database/connection.js";
import { NutritionDay } from "../models/NutritionDay.js";
import { nutritionDayQueries } from "../queries/nutritionDayQueries.js";

const mapRowToNutritionDay = (row) => new NutritionDay({
    id: row.id,
    nutritionPlanId: row.nutrition_plan_id,
    dayDate: row.day_date,
    notes: row.notes
});

export class NutritionDayRepository {
    static async create(nutritionDay, connection = pool) {
        const [result] = await connection.execute(
            nutritionDayQueries.create,
            [
                nutritionDay.nutritionPlanId,
                nutritionDay.dayDate,
                nutritionDay.notes
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            nutritionDayQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToNutritionDay(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            nutritionDayQueries.findAll
        );

        return rows.map(mapRowToNutritionDay);
    }

    static async findByNutritionPlanId(
        nutritionPlanId,
        connection = pool
    ) {
        const [rows] = await connection.execute(
            nutritionDayQueries.findByNutritionPlanId,
            [nutritionPlanId]
        );

        return rows.map(mapRowToNutritionDay);
    }

    static async findByPlanAndDate(
        nutritionPlanId,
        dayDate,
        connection = pool
    ) {
        const [rows] = await connection.execute(
            nutritionDayQueries.findByPlanAndDate,
            [
                nutritionPlanId,
                dayDate
            ]
        );

        return rows[0] ? mapRowToNutritionDay(rows[0]) : null;
    }

    static async update(id, nutritionDay, connection = pool) {
        const [result] = await connection.execute(
            nutritionDayQueries.update,
            [
                nutritionDay.dayDate,
                nutritionDay.notes,
                id
            ]
        );

        return result.affectedRows;
    }
}