import pool from "../database/connection.js";
import { ClientPlan } from "../models/ClientPlan.js";
import { clientPlanQueries } from "../queries/clientPlanQueries.js";

const mapRowToClientPlan = (row) => new ClientPlan({
    id: row.id,
    clientId: row.client_id,
    trainingPlanId: row.training_plan_id,
    previousClientPlanId: row.previous_client_plan_id,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    agreedPrice: row.agreed_price,
    goal: row.goal,
    cancelledAt: row.cancelled_at,
    cancellationReason: row.cancellation_reason,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export class ClientPlanRepository {
    static async create(clientPlan, connection = pool) {
        const [result] = await connection.execute(
            clientPlanQueries.create,
            [
                clientPlan.clientId,
                clientPlan.trainingPlanId,
                clientPlan.previousClientPlanId,
                clientPlan.startDate,
                clientPlan.endDate,
                clientPlan.status,
                clientPlan.agreedPrice,
                clientPlan.goal,
                clientPlan.cancelledAt,
                clientPlan.cancellationReason
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            clientPlanQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToClientPlan(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            clientPlanQueries.findAll
        );

        return rows.map(mapRowToClientPlan);
    }

    static async findByClientId(clientId, connection = pool) {
        const [rows] = await connection.execute(
            clientPlanQueries.findByClientId,
            [clientId]
        );

        return rows.map(mapRowToClientPlan);
    }

    static async findActiveByClientId(clientId, connection = pool) {
        const [rows] = await connection.execute(
            clientPlanQueries.findActiveByClientId,
            [clientId]
        );

        return rows.map(mapRowToClientPlan);
    }

    static async update(id, clientPlan, connection = pool) {
        const [result] = await connection.execute(
            clientPlanQueries.update,
            [
                clientPlan.trainingPlanId,
                clientPlan.previousClientPlanId,
                clientPlan.startDate,
                clientPlan.endDate,
                clientPlan.status,
                clientPlan.agreedPrice,
                clientPlan.goal,
                clientPlan.cancelledAt,
                clientPlan.cancellationReason,
                id
            ]
        );

        return result.affectedRows;
    }

    static async cancel(id, cancelledAt, cancellationReason, connection = pool) {
        const [result] = await connection.execute(
            clientPlanQueries.cancel,
            [
                cancelledAt,
                cancellationReason,
                id
            ]
        );

        return result.affectedRows;
    }
}