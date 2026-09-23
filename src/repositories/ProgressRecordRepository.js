import pool from "../database/connection.js";
import { ProgressRecord } from "../models/ProgressRecord.js";
import { progressRecordQueries } from "../queries/progressRecordQueries.js";

const mapRowToProgressRecord = (row) => new ProgressRecord({
    id: row.id,
    clientPlanId: row.client_plan_id,
    recordDate: row.record_date,
    weightKg: row.weight_kg,
    bodyFatPercentage: row.body_fat_percentage,
    waistCm: row.waist_cm,
    chestCm: row.chest_cm,
    armCm: row.arm_cm,
    legCm: row.leg_cm,
    photoUrl: row.photo_url,
    comments: row.comments,
    createdAt: row.created_at
});

export class ProgressRecordRepository {
    static async create(progressRecord, connection = pool) {
        const [result] = await connection.execute(
            progressRecordQueries.create,
            [
                progressRecord.clientPlanId,
                progressRecord.recordDate,
                progressRecord.weightKg,
                progressRecord.bodyFatPercentage,
                progressRecord.waistCm,
                progressRecord.chestCm,
                progressRecord.armCm,
                progressRecord.legCm,
                progressRecord.photoUrl,
                progressRecord.comments
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            progressRecordQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToProgressRecord(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            progressRecordQueries.findAll
        );

        return rows.map(mapRowToProgressRecord);
    }

    static async findByClientPlanId(clientPlanId, connection = pool) {
        const [rows] = await connection.execute(
            progressRecordQueries.findByClientPlanId,
            [clientPlanId]
        );

        return rows.map(mapRowToProgressRecord);
    }

    static async findByClientPlanAndDate(
        clientPlanId,
        recordDate,
        connection = pool
    ) {
        const [rows] = await connection.execute(
            progressRecordQueries.findByClientPlanAndDate,
            [
                clientPlanId,
                recordDate
            ]
        );

        return rows[0] ? mapRowToProgressRecord(rows[0]) : null;
    }

    static async update(id, progressRecord, connection = pool) {
        const [result] = await connection.execute(
            progressRecordQueries.update,
            [
                progressRecord.recordDate,
                progressRecord.weightKg,
                progressRecord.bodyFatPercentage,
                progressRecord.waistCm,
                progressRecord.chestCm,
                progressRecord.armCm,
                progressRecord.legCm,
                progressRecord.photoUrl,
                progressRecord.comments,
                id
            ]
        );

        return result.affectedRows;
    }
}