import { Client } from "../models/Client.js";
import { ClientRepository } from "../repositories/ClientRepository.js";
import { ClientValidator } from "../validators/ClientValidator.js";

export class ClientService {

    static async create(data) {
        const validatedData = ClientValidator.validateCreate(data);
        const existingClient =
            await ClientRepository.findByEmail(validatedData.email);
        if (existingClient) {
            throw new Error("Ya existe un cliente con ese email.");
        }

        const client = new Client(validatedData);
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
        const validatedData =
            ClientValidator.validateUpdate(data);
        if (
            validatedData.email !== existingClient.email
        ) {
            const clientWithEmail =
                await ClientRepository.findByEmail(
                    validatedData.email
                );
            if (
                clientWithEmail &&
                clientWithEmail.id !== Number(id)
            ) {
                throw new Error(
                    "Ya existe otro cliente con ese email."
                );
            }
        }

        const client = new Client(validatedData);

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