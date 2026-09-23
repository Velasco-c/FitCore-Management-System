import { ClientService } from "../../src/services/ClientService.js";
import { TrainingPlanService } from "../../src/services/TrainingPlanService.js";
import { ClientPlanService } from "../../src/services/ClientPlanService.js";

const testEmail = `test.plan.${Date.now()}@fitcore.test`;
const testPlanName = `Test Client Plan ${Date.now()}`;

console.log("========================================");
console.log("PRUEBA DE CLIENT PLAN SERVICE");
console.log("========================================");

try {
    const clientId = await ClientService.create({
        firstName: "Test",
        lastName: "Client Plan",
        email: testEmail,
        phone: "00000000",
        birthDate: "2000-01-01",
        gender: "OTHER",
        status: "ACTIVE"
    });

    console.log("CLIENT CREATE:", clientId);

    const trainingPlanId = await TrainingPlanService.create({
        name: testPlanName,
        description: "Plan de prueba",
        durationWeeks: 8,
        physicalGoals: "Mejorar condición física",
        level: "BEGINNER",
        price: 500,
        status: "ACTIVE"
    });

    console.log("TRAINING PLAN CREATE:", trainingPlanId);

    const clientPlanId = await ClientPlanService.create({
        clientId,
        trainingPlanId,
        startDate: "2026-09-23",
        endDate: "2026-11-18",
        status: "ACTIVE",
        agreedPrice: 500,
        goal: "Mejorar condición física",
        cancelledAt: null,
        cancellationReason: null
    });

    console.log("CLIENT PLAN CREATE:", clientPlanId);

    const clientPlan = await ClientPlanService.findById(clientPlanId);
    console.log("FIND BY ID:", clientPlan);

    const clientPlans = await ClientPlanService.findByClientId(clientId);
    console.log("FIND BY CLIENT:", clientPlans.length);

    const activePlans = await ClientPlanService.findActiveByClientId(clientId);
    console.log("FIND ACTIVE:", activePlans.length);

    const allPlans = await ClientPlanService.findAll();
    console.log("FIND ALL:", allPlans.length);

    const updated = await ClientPlanService.update(clientPlanId, {
        trainingPlanId,
        startDate: "2026-09-23",
        endDate: "2026-12-23",
        status: "ACTIVE",
        agreedPrice: 600,
        goal: "Mejorar fuerza",
        cancelledAt: null,
        cancellationReason: null
    });

    console.log("UPDATE:", updated);

    const cancelled = await ClientPlanService.cancel(
        clientPlanId,
        new Date(),
        "Prueba de cancelación"
    );

    console.log("CANCEL:", cancelled);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
