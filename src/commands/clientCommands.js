import { ClientService } from '../services/ClientService.js';

export async function createClient(data) {
    return ClientService.create(data);
}

export async function findClientById(id) {
    return ClientService.findById(id);
}

export async function findClientByEmail(email) {
    return ClientService.findByEmail(email);
}

export async function findAllClients() {
    return ClientService.findAll();
}

export async function updateClient(id, data) {
    return ClientService.update(id, data);
}

export async function deactivateClient(id) {
    return ClientService.deactivate(id);
}