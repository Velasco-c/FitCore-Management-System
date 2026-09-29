import { ContractService } from '../services/ContractService.js';
import { ContractValidator } from '../validators/ContractValidator.js';

export async function createContract(data) {
    const validatedData = ContractValidator.validateCreate(data);
    return ContractService.create(validatedData);
}

export async function findContractById(id) {
    ContractValidator.validateId(id, "id");
    return ContractService.findById(id);
}

export async function findContractByClientPlanId(clientPlanId) {
    ContractValidator.validateId(clientPlanId, "clientPlanId");
    return ContractService.findByClientPlanId(clientPlanId);
}

export async function findContractByNumber(contractNumber) {
    ContractValidator.validateRequiredString(
        contractNumber,
        "contractNumber"
    );
    return ContractService.findByNumber(contractNumber.trim());
}

export async function findAllContracts() {
    return ContractService.findAll();
}

export async function updateContract(id, data) {
    ContractValidator.validateId(id, "id");
    const validatedData = ContractValidator.validateUpdate(data);
    return ContractService.update(id, validatedData);
}

export async function updateContractStatus(id, status) {
    ContractValidator.validateId(id, "id");
    ContractValidator.validateStatus(status);
    return ContractService.updateStatus(id, status);
}
