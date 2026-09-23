import { NutritionPlanService } from "../../src/services/NutritionPlanService.js";

console.log("========================================");
console.log("PRUEBA DE NUTRITION PLAN SERVICE");
console.log("========================================");

try {
    const planId = await NutritionPlanService.create({
        clientPlanId: 1,
        name: "Plan nutricional de prueba",
        description: "Plan de alimentación de prueba",
        dailyCalorieTarget: 2500,
        startDate: "2026-09-23",
        endDate: "2026-10-23",
        status: "ACTIVE"
    });

    console.log("CREATE:", planId);

    const plan = await NutritionPlanService.findById(planId);
    console.log("FIND BY ID:", plan);

    const plans =
        await NutritionPlanService.findByClientPlanId(1);

    console.log("FIND BY CLIENT PLAN:", plans.length);

    const allPlans = await NutritionPlanService.findAll();
    console.log("FIND ALL:", allPlans.length);

    const updated = await NutritionPlanService.update(planId, {
        name: "Plan nutricional actualizado",
        description: "Descripción actualizada",
        dailyCalorieTarget: 2700,
        startDate: "2026-09-23",
        endDate: "2026-11-23",
        status: "ACTIVE"
    });

    console.log("UPDATE:", updated);

    const updatedStatus =
        await NutritionPlanService.updateStatus(
            planId,
            "COMPLETED"
        );

    console.log("UPDATE STATUS:", updatedStatus);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
