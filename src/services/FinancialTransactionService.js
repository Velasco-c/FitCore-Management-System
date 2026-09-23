import { FinancialTransactionRepository } from "../repositories/FinancialTransactionRepository.js";

export class FinancialTransactionService {

    static async create(financialTransaction) {
        return await FinancialTransactionRepository.create(
            financialTransaction
        );
    }

    static async findById(id) {
        return await FinancialTransactionRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return await FinancialTransactionRepository.findByClientPlanId(
            clientPlanId
        );
    }

    static async findByType(type) {
        return await FinancialTransactionRepository.findByType(type);
    }

    static async findAll() {
        return await FinancialTransactionRepository.findAll();
    }

    static async updateStatus(id, status) {
        return await FinancialTransactionRepository.updateStatus(
            id,
            status
        );
    }
}