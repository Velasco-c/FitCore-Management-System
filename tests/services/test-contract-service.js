import { ContractService } from "../../src/services/ContractService.js";

const contractNumber = `TEST-${Date.now()}`;

console.log("========================================");
console.log("PRUEBA DE CONTRACT SERVICE");
console.log("========================================");

try {
    const contractId = await ContractService.create({
        clientPlanId: 1,
        contractNumber,
        conditions: "Condiciones de prueba",
        startDate: "2026-09-23",
        endDate: "2026-11-23",
        price: 500,
        status: "ACTIVE"
    });

    console.log("CREATE:", contractId);

    const contract = await ContractService.findById(contractId);
    console.log("FIND BY ID:", contract);

    const contractByClientPlan =
        await ContractService.findByClientPlanId(1);

    console.log("FIND BY CLIENT PLAN:", contractByClientPlan);

    const contractByNumber =
        await ContractService.findByNumber(contractNumber);

    console.log("FIND BY NUMBER:", contractByNumber);

    const contracts = await ContractService.findAll();
    console.log("FIND ALL:", contracts.length);

    const updated = await ContractService.update(contractId, {
        conditions: "Condiciones actualizadas",
        startDate: "2026-09-23",
        endDate: "2026-12-23",
        price: 600
    });

    console.log("UPDATE:", updated);

    const updatedStatus =
        await ContractService.updateStatus(contractId, "COMPLETED");

    console.log("UPDATE STATUS:", updatedStatus);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
