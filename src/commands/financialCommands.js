import { FinancialTransactionService } from '../services/FinancialTransactionService.js';
import { FinancialTransactionValidator } from '../validators/FinancialTransactionValidator.js';
import { financialTransactionQueries } from '../queries/financialTransactionQueries.js';
import { databaseConfig } from '../config/database.js';

export async function createFinancialTransaction(data) {
    const validatedData =
        FinancialTransactionValidator.validateCreate(data);
    return FinancialTransactionService.create(validatedData);
}

export async function findFinancialTransactionById(id) {
    FinancialTransactionValidator.validateId(id, "id");
    return FinancialTransactionService.findById(id);
}

export async function findAllFinancialTransactions() {
    return FinancialTransactionService.findAll();
}

export async function updateFinancialTransaction(id, data) {
    FinancialTransactionValidator.validateId(id, "id");
    const validatedData =
        FinancialTransactionValidator.validateUpdate(data);
    return FinancialTransactionService.update(id, validatedData);
}

export async function updateFinancialTransactionStatus(id, status) {
    FinancialTransactionValidator.validateId(id, "id");
    FinancialTransactionValidator.validateStatus(status);
    return FinancialTransactionService.updateStatus(id, status);
}

export async function findFinancialTransactionsByClientPlanId(
    clientPlanId
) {
    FinancialTransactionValidator.validateId(
        clientPlanId,
        "clientPlanId"
    );
    return FinancialTransactionService.findByClientPlanId(
        clientPlanId
    );
}

export async function findFinancialTransactionsByType(type) {
    FinancialTransactionValidator.validateType(type);
    return FinancialTransactionService.findByType(type);
}

export async function generateFinancialReport(year, month, clientPlanId = null) {
    const connection = await databaseConfig.getConnection();
    try {
        const [rows] = await connection.execute(
            financialTransactionQueries.generateMonthlyReport,
            [year, month, clientPlanId, clientPlanId]
        );
        return rows[0];
    } finally {
        connection.release();
    }
}