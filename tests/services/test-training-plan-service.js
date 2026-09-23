import { TrainingPlanService } from "../../src/services/TrainingPlanService.js";

const testName = `Test Plan ${Date.now()}`;

console.log("========================================");
console.log("PRUEBA DE TRAINING PLAN SERVICE");
console.log("========================================");

try {
    const planId = await TrainingPlanService.create({
        name: testName,
        description: "Plan de prueba",
        durationWeeks: 8,
        physicalGoals: "Mejorar resistencia",
        level: "BEGINNER",
        price: 500,
        status: "ACTIVE"
    });

    console.log("CREATE:", planId);

    const plan = await TrainingPlanService.findById(planId);
    console.log("FIND BY ID:", plan);

    const planByName = await TrainingPlanService.findByName(testName);
    console.log("FIND BY NAME:", planByName);

    const plans = await TrainingPlanService.findAll();
    console.log("FIND ALL:", plans.length);

    const updated = await TrainingPlanService.update(planId, {
        name: testName,
        description: "Plan actualizado",
        durationWeeks: 12,
        physicalGoals: "Mejorar fuerza",
        level: "INTERMEDIATE",
        price: 650,
        status: "ACTIVE"
    });

    console.log("UPDATE:", updated);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
