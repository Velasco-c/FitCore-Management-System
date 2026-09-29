import { ClientService } from '../services/ClientService.js';
import { ClientValidator } from '../validators/ClientValidator.js';

export async function createClient(data) {
    const validatedData = ClientValidator.validateCreate(data);
    return ClientService.create(validatedData);
}

export async function updateClient(id, data) {
    ClientValidator.validateId(id, "id");
    const validatedData = ClientValidator.validateUpdate(data);
    return ClientService.update(id, validatedData);
}

export async function findClientById(id) {
    ClientValidator.validateId(id, "id");
    return ClientService.findById(id);
}

export async function findClientByEmail(email) {
    ClientValidator.validateEmail(email);
    return ClientService.findByEmail(email.toLowerCase());
}

export async function findAllClients() {
    return ClientService.findAll();
}

export async function deactivateClient(id) {
    ClientValidator.validateId(id, "id");
    return ClientService.deactivate(id);
}
