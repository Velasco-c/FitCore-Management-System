import { pool } from "../database/connection.js";
import { Contract } from "../models/Contract.js";
import { contractQueries } from "../queries/contractQueries.js";

const mapRowToContract = (row) => new Contract({
    id: row.id,
    clientPlanId: row.client_plan_id,
    contractNumber: row.contract_number,
    conditions: row.conditions,
    startDate: row.start_date,
    endDate: row.end_date,
    price: row.price,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export class ContractRepository {
    static async create(contract, connection = pool) {
        const [result] = await connection.execute(
            contractQueries.create,
            [
                contract.clientPlanId,
                contract.contractNumber,
                contract.conditions,
                contract.startDate,
                contract.endDate,
                contract.price,
                contract.status
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            contractQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToContract(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            contractQueries.findAll
        );

        return rows.map(mapRowToContract);
    }

    static async findByClientPlanId(clientPlanId, connection = pool) {
        const [rows] = await connection.execute(
            contractQueries.findByClientPlanId,
            [clientPlanId]
        );

        return rows[0] ? mapRowToContract(rows[0]) : null;
    }

    static async findByNumber(contractNumber, connection = pool) {
        const [rows] = await connection.execute(
            contractQueries.findByNumber,
            [contractNumber]
        );

        return rows[0] ? mapRowToContract(rows[0]) : null;
    }

    static async update(id, contract, connection = pool) {
        const [result] = await connection.execute(
            contractQueries.update,
            [
                contract.contractNumber,
                contract.conditions,
                contract.startDate,
                contract.endDate,
                contract.price,
                contract.status,
                id
            ]
        );

        return result.affectedRows;
    }

    static async updateStatus(id, status, connection = pool) {
        const [result] = await connection.execute(
            contractQueries.updateStatus,
            [status, id]
        );

        return result.affectedRows;
    }
}