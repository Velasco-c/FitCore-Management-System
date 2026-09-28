import { FinancialTransactionService } from '../services/FinancialTransactionService.js';

export async function createFinancialTransaction(data) {
    return FinancialTransactionService.create(data);
}

export async function findFinancialTransactionById(id) {
    return FinancialTransactionService.findById(id);
}

export async function findAllFinancialTransactions() {
    return FinancialTransactionService.findAll();
}

export async function updateFinancialTransaction(id, data) {
    return FinancialTransactionService.update(id, data);
}

export async function updateFinancialTransactionStatus(id, status) {
    return FinancialTransactionService.updateStatus(id, status);
}

export async function findFinancialTransactionsByClientPlanId(
    clientPlanId
) {
    return FinancialTransactionService.findByClientPlanId(
        clientPlanId
    );
}

export async function findFinancialTransactionsByType(type) {
    return FinancialTransactionService.findByType(type);
}