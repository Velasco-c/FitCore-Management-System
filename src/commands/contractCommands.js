import { ContractService } from '../services/ContractService.js';

export async function createContract(data) {
    return ContractService.create(data);
}

export async function findContractById(id) {
    return ContractService.findById(id);
}

export async function findContractByClientPlanId(clientPlanId) {
    return ContractService.findByClientPlanId(clientPlanId);
}

export async function findContractByNumber(contractNumber) {
    return ContractService.findByNumber(contractNumber);
}

export async function findAllContracts() {
    return ContractService.findAll();
}

export async function updateContract(id, data) {
    return ContractService.update(id, data);
}

export async function updateContractStatus(id, status) {
    return ContractService.updateStatus(id, status);
}