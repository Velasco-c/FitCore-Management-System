import { FinancialTransactionService } from "../../src/services/FinancialTransactionService.js";

console.log("========================================");
console.log("PRUEBA DE FINANCIAL TRANSACTION SERVICE");
console.log("========================================");

try {
    const transactionId =
        await FinancialTransactionService.create({
            clientPlanId: 1,
            type: "INCOME",
            category: "MEMBERSHIP",
            amount: 500,
            transactionDate: "2026-09-23",
            paymentMethod: "CASH",
            description: "Pago de prueba",
            reference: `TEST-${Date.now()}`,
            status: "COMPLETED"
        });

    console.log("CREATE:", transactionId);

    const transaction =
        await FinancialTransactionService.findById(
            transactionId
        );

    console.log("FIND BY ID:", transaction);

    const transactionsByClientPlan =
        await FinancialTransactionService.findByClientPlanId(1);

    console.log(
        "FIND BY CLIENT PLAN:",
        transactionsByClientPlan.length
    );

    const transactionsByType =
        await FinancialTransactionService.findByType("INCOME");

    console.log(
        "FIND BY TYPE:",
        transactionsByType.length
    );

    const transactions =
        await FinancialTransactionService.findAll();

    console.log("FIND ALL:", transactions.length);

    const updatedStatus =
        await FinancialTransactionService.updateStatus(
            transactionId,
            "CANCELLED"
        );

    console.log("UPDATE STATUS:", updatedStatus);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
