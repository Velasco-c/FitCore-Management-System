import { NutritionDayService } from "../../src/services/NutritionDayService.js";

console.log("========================================");
console.log("PRUEBA DE NUTRITION DAY SERVICE");
console.log("========================================");

try {
    const dayId = await NutritionDayService.create({
        nutritionPlanId: 1,
        dayDate: "2026-09-23",
        notes: "Día de prueba"
    });

    console.log("CREATE:", dayId);

    const day = await NutritionDayService.findById(dayId);
    console.log("FIND BY ID:", day);

    const days =
        await NutritionDayService.findByNutritionPlanId(1);

    console.log("FIND BY NUTRITION PLAN:", days.length);

    const dayByDate =
        await NutritionDayService.findByPlanAndDate(
            1,
            "2026-09-23"
        );

    console.log("FIND BY PLAN AND DATE:", dayByDate);

    const allDays = await NutritionDayService.findAll();
    console.log("FIND ALL:", allDays.length);

    const updated = await NutritionDayService.update(dayId, {
        dayDate: "2026-09-24",
        notes: "Día actualizado"
    });

    console.log("UPDATE:", updated);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
