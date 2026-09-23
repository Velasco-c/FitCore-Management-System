import { ContractRepository } from "../repositories/ContractRepository.js";

export class ContractService {

    static async create(contract) {
        return await ContractRepository.create(contract);
    }

    static async findById(id) {
        return await ContractRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return await ContractRepository.findByClientPlanId(clientPlanId);
    }

    static async findByContractNumber(contractNumber) {
        return await ContractRepository.findByContractNumber(contractNumber);
    }

    static async findAll() {
        return await ContractRepository.findAll();
    }

    static async update(id, contract) {
        return await ContractRepository.update(id, contract);
    }

    static async updateStatus(id, status) {
        return await ContractRepository.updateStatus(id, status);
    }
}