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
        return ContractRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return ContractRepository.findByClientPlanId(clientPlanId);
    }

    static async findByContractNumber(contractNumber) {
        return ContractRepository.findByContractNumber(contractNumber);
    }

    static async findAll() {
        return ContractRepository.findAll();
    }

    static async update(id, data) {
        const validatedData = ContractValidator.validateUpdate(data);
        const contract = new Contract(validatedData);
        return ContractRepository.update(id, contract);
    }

    static async updateStatus(id, status) {
        return ContractRepository.updateStatus(id, status);
    }
}