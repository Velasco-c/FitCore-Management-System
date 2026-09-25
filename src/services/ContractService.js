import { Contract } from "../models/Contract.js";
import { ContractRepository } from "../repositories/ContractRepository.js";
import { ContractValidator } from "../validators/ContractValidator.js";

export class ContractService {
    static async create(data) {
        const validatedData = ContractValidator.validateCreate(data);
        const contract = new Contract(validatedData);
        return ContractRepository.create(contract);
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