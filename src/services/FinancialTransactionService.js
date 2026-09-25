import { FinancialTransaction } from "../models/FinancialTransaction.js";
import { FinancialTransactionRepository } from "../repositories/FinancialTransactionRepository.js";
import { FinancialTransactionValidator } from "../validators/FinancialTransactionValidator.js";

export class FinancialTransactionService {

    static async create(data) {
        const validatedData = FinancialTransactionValidator.validateCreate(data);
        const financialTransaction = new FinancialTransaction(validatedData);
        return FinancialTransactionRepository.create(financialTransaction);
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