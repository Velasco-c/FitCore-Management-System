import { FinancialTransaction } from "../models/FinancialTransaction.js";
import { FinancialTransactionRepository } from "../repositories/FinancialTransactionRepository.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";

export class FinancialTransactionService {

    static async create(data) {
        if (data.clientPlanId) {
            const clientPlan =
                await ClientPlanRepository.findById(
                    data.clientPlanId
                );
            if (!clientPlan) {
                throw new Error(
                    "La asignación del plan no existe."
                );
            }
        }

        const transaction =
            new FinancialTransaction(data);

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

    static async findByClientPlanId(clientPlanId) {
        return FinancialTransactionRepository.findByClientPlanId(
            clientPlanId
        );
    }

    static async findByType(type) {
        return FinancialTransactionRepository.findByType(
            type
        );
    }

    static async update(id, data) {
        const existingTransaction =
            await FinancialTransactionRepository.findById(id);

        if (!existingTransaction) {
            throw new Error(
                "La transacción financiera no existe."
            );
        }

        const transaction =
            new FinancialTransaction(data);

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