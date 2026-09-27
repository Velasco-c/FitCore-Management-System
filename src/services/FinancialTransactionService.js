import { FinancialTransaction } from "../models/FinancialTransaction.js";
import { FinancialTransactionRepository } from "../repositories/FinancialTransactionRepository.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { FinancialTransactionValidator } from "../validators/FinancialTransactionValidator.js";

export class FinancialTransactionService {

    static async create(data) {
        const validatedData =
            FinancialTransactionValidator.validateCreate(data);
        if (validatedData.clientPlanId) {
            const clientPlan =
                await ClientPlanRepository.findById(
                    validatedData.clientPlanId
                );
            if (!clientPlan) {
                throw new Error(
                    "La asignación del plan no existe."
                );
            }
        }

        const transaction =
            new FinancialTransaction(validatedData);
        return FinancialTransactionRepository.create(
            transaction
        );
    }

    static async findById(id) {
        return FinancialTransactionRepository.findById(id);
    }

    static async findAll() {
        return FinancialTransactionRepository.findAll();
    }

    static async update(id, data) {
        const existingTransaction =
            await FinancialTransactionRepository.findById(id);
        if (!existingTransaction) {
            throw new Error(
                "La transacción financiera no existe."
            );
        }
        const validatedData =
            FinancialTransactionValidator.validateUpdate(data);
        const transaction =
            new FinancialTransaction(validatedData);
        return FinancialTransactionRepository.update(
            id,
            transaction
        );
    }

    static async updateStatus(id, status) {
        const existingTransaction =
            await FinancialTransactionRepository.findById(id);
        if (!existingTransaction) {
            throw new Error(
                "La transacción financiera no existe."
            );
        }
        return FinancialTransactionRepository.updateStatus(
            id,
            status
        );
    }
}