import { pool } from "../database/connection.js";
import { FinancialTransaction } from "../models/FinancialTransaction.js";
import { financialTransactionQueries } from "../queries/financialTransactionQueries.js";

const mapRowToFinancialTransaction = (row) =>
    new FinancialTransaction({
        id: row.id,
        clientPlanId: row.client_plan_id,
        type: row.type,
        category: row.category,
        amount: row.amount,
        transactionDate: row.transaction_date,
        paymentMethod: row.payment_method,
        description: row.description,
        reference: row.reference,
        status: row.status,
        createdAt: row.created_at
    });

export class FinancialTransactionRepository {
    static async create(
        financialTransaction,
        connection = pool
    ) {
        const [result] = await connection.execute(
            financialTransactionQueries.create,
            [
                financialTransaction.clientPlanId,
                financialTransaction.type,
                financialTransaction.category,
                financialTransaction.amount,
                financialTransaction.transactionDate,
                financialTransaction.paymentMethod,
                financialTransaction.description,
                financialTransaction.reference,
                financialTransaction.status
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            financialTransactionQueries.findById,
            [id]
        );

        return rows[0]
            ? mapRowToFinancialTransaction(rows[0])
            : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            financialTransactionQueries.findAll
        );

        return rows.map(mapRowToFinancialTransaction);
    }

    static async findByClientPlanId(
        clientPlanId,
        connection = pool
    ) {
        const [rows] = await connection.execute(
            financialTransactionQueries.findByClientPlanId,
            [clientPlanId]
        );

        return rows.map(mapRowToFinancialTransaction);
    }

    static async findByType(type, connection = pool) {
        const [rows] = await connection.execute(
            financialTransactionQueries.findByType,
            [type]
        );

        return rows.map(mapRowToFinancialTransaction);
    }

    static async updateStatus(
        id,
        status,
        connection = pool
    ) {
        const [result] = await connection.execute(
            financialTransactionQueries.updateStatus,
            [status, id]
        );

        return result.affectedRows;
    }
}