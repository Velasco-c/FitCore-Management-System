import { Client } from "../models/Client.js";
import { ClientRepository } from "../repositories/ClientRepository.js";
import { ClientValidator } from "../validators/ClientValidator.js";

export class ClientService {

    static async create(data) {
        const validatedData = ClientValidator.validateCreate(data);
        const client = new Client(validatedData);
        return ClientRepository.create(client);
    }

    static async findById(id) {
        return await ClientRepository.findById(id);
    }

    static async findByEmail(email) {
        return await ClientRepository.findByEmail(email);
    }

    static async findAll() {
        return await ClientRepository.findAll();
    }

    static async update(id, client) {
        return await ClientRepository.update(id, client);
    }
}