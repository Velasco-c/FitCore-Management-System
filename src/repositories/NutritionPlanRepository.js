import pool from "../database/connection.js";
import { NutritionPlan } from "../models/NutritionPlan.js";
import { nutritionPlanQueries } from "../queries/nutritionPlanQueries.js";

const mapRowToNutritionPlan = (row) => new NutritionPlan({
    id: row.id,
    clientPlanId: row.client_plan_id,
    name: row.name,
    description: row.description,
    dailyCalorieTarget: row.daily_calorie_target,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export class NutritionPlanRepository {
    static async create(nutritionPlan, connection = pool) {
        const [result] = await connection.execute(
            nutritionPlanQueries.create,
            [
                nutritionPlan.clientPlanId,
                nutritionPlan.name,
                nutritionPlan.description,
                nutritionPlan.dailyCalorieTarget,
                nutritionPlan.startDate,
                nutritionPlan.endDate,
                nutritionPlan.status
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            nutritionPlanQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToNutritionPlan(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            nutritionPlanQueries.findAll
        );

        return rows.map(mapRowToNutritionPlan);
    }

    static async findByClientPlanId(clientPlanId, connection = pool) {
        const [rows] = await connection.execute(
            nutritionPlanQueries.findByClientPlanId,
            [clientPlanId]
        );

        return rows.map(mapRowToNutritionPlan);
    }

    static async update(id, nutritionPlan, connection = pool) {
        const [result] = await connection.execute(
            nutritionPlanQueries.update,
            [
                nutritionPlan.name,
                nutritionPlan.description,
                nutritionPlan.dailyCalorieTarget,
                nutritionPlan.startDate,
                nutritionPlan.endDate,
                nutritionPlan.status,
                id
            ]
        );

        return result.affectedRows;
    }

    static async updateStatus(id, status, connection = pool) {
        const [result] = await connection.execute(
            nutritionPlanQueries.updateStatus,
            [status, id]
        );

        return result.affectedRows;
    }
}