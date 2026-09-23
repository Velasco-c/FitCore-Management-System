import { pool } from "../database/connection.js";
import { TrainingPlan } from "../models/TrainingPlan.js";
import { trainingPlanQueries } from "../queries/trainingPlanQueries.js";

const mapRowToTrainingPlan = (row) => new TrainingPlan({
    id: row.id,
    name: row.name,
    description: row.description,
    durationWeeks: row.duration_weeks,
    physicalGoals: row.physical_goals,
    level: row.level,
    price: row.price,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export class TrainingPlanRepository {
    static async create(trainingPlan, connection = pool) {
        const [result] = await connection.execute(
            trainingPlanQueries.create,
            [
                trainingPlan.name,
                trainingPlan.description,
                trainingPlan.durationWeeks,
                trainingPlan.physicalGoals,
                trainingPlan.level,
                trainingPlan.price
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            trainingPlanQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToTrainingPlan(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            trainingPlanQueries.findAll
        );

        return rows.map(mapRowToTrainingPlan);
    }

    static async findByName(name, connection = pool) {
        const [rows] = await connection.execute(
            trainingPlanQueries.findByName,
            [name]
        );

        return rows[0] ? mapRowToTrainingPlan(rows[0]) : null;
    }

    static async update(id, trainingPlan, connection = pool) {
        const [result] = await connection.execute(
            trainingPlanQueries.update,
            [
                trainingPlan.name,
                trainingPlan.description,
                trainingPlan.durationWeeks,
                trainingPlan.physicalGoals,
                trainingPlan.level,
                trainingPlan.price,
                id
            ]
        );

        return result.affectedRows;
    }

    static async deactivate(id, connection = pool) {
        const [result] = await connection.execute(
            trainingPlanQueries.deactivate,
            [id]
        );

        return result.affectedRows;
    }
}