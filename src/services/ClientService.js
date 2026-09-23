import { ClientRepository } from "../repositories/ClientRepository.js";

export class ClientService {

    static async create(client) {
        return await ClientRepository.create(client);
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