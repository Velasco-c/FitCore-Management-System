import pool from "../database/connection.js";
import { Client } from "../models/Client.js";
import { clientQueries } from "../queries/clientQueries.js";

const mapRowToClient = (row) => new Client({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    birthDate: row.birth_date,
    gender: row.gender,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
});

export class ClientRepository {
    static async create(client, connection = pool) {
        const [result] = await connection.execute(
            clientQueries.create,
            [
                client.firstName,
                client.lastName,
                client.email,
                client.phone,
                client.birthDate,
                client.gender
            ]
        );

        return result.insertId;
    }

    static async findById(id, connection = pool) {
        const [rows] = await connection.execute(
            clientQueries.findById,
            [id]
        );

        return rows[0] ? mapRowToClient(rows[0]) : null;
    }

    static async findAll(connection = pool) {
        const [rows] = await connection.execute(
            clientQueries.findAll
        );

        return rows.map(mapRowToClient);
    }

    static async findByEmail(email, connection = pool) {
        const [rows] = await connection.execute(
            clientQueries.findByEmail,
            [email]
        );

        return rows[0] ? mapRowToClient(rows[0]) : null;
    }

    static async update(id, client, connection = pool) {
        const [result] = await connection.execute(
            clientQueries.update,
            [
                client.firstName,
                client.lastName,
                client.email,
                client.phone,
                client.birthDate,
                client.gender,
                id
            ]
        );

        return result.affectedRows;
    }

    static async deactivate(id, connection = pool) {
        const [result] = await connection.execute(
            clientQueries.deactivate,
            [id]
        );

        return result.affectedRows;
    }
}