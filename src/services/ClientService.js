import { Client } from "../models/Client.js";
import { ClientRepository } from "../repositories/ClientRepository.js";

export class ClientService {

    static async create(data) {
        const existingClient =
            await ClientRepository.findByEmail(data.email);
        if (existingClient) {
            throw new Error("Ya existe un cliente con ese email.");
        }

        const client = new Client(data);
        return ClientRepository.create(client);
    }

    static async findById(id) {
        return ClientRepository.findById(id);
    }

    static async findByEmail(email) {
        return ClientRepository.findByEmail(email);
    }

    static async findAll() {
        return ClientRepository.findAll();
    }

    static async update(id, data) {

        const existingClient =
            await ClientRepository.findById(id);

        if (!existingClient) {
            throw new Error("El cliente no existe.");
        }

        if (data.email !== existingClient.email) {

            const clientWithEmail =
                await ClientRepository.findByEmail(data.email);

            if (
                clientWithEmail &&
                clientWithEmail.id !== Number(id)
            ) {
                throw new Error(
                    "Ya existe otro cliente con ese email."
                );
            }
        }

        const client = new Client(data);
        return ClientRepository.update(id, client);
    }

    static async deactivate(id) {
        const existingClient =
            await ClientRepository.findById(id);
        if (!existingClient) {
            throw new Error("El cliente no existe.");
        }

        if (existingClient.status === "INACTIVE") {
            throw new Error("El cliente ya está inactivo.");
        }

        return ClientRepository.deactivate(id);
    }
}