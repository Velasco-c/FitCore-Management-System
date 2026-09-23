import { NutritionDayFoodService } from "../../src/services/NutritionDayFoodService.js";

console.log("========================================");
console.log("PRUEBA DE NUTRITION DAY FOOD SERVICE");
console.log("========================================");

try {
    const nutritionDayFoodId =
        await NutritionDayFoodService.create({
            nutritionDayId: 1,
            foodId: 1,
            mealType: "BREAKFAST",
            quantity: 100,
            estimatedCalories: 150,
            notes: "Registro de prueba"
        });

    console.log("CREATE:", nutritionDayFoodId);

    const record =
        await NutritionDayFoodService.findById(
            nutritionDayFoodId
        );

    console.log("FIND BY ID:", record);

    const records =
        await NutritionDayFoodService.findByNutritionDayId(1);

    console.log("FIND BY NUTRITION DAY:", records.length);

    const foodRecords =
        await NutritionDayFoodService.findByFoodId(1);

    console.log("FIND BY FOOD:", foodRecords.length);

    const allRecords =
        await NutritionDayFoodService.findAll();

    console.log("FIND ALL:", allRecords.length);

    const updated =
        await NutritionDayFoodService.update(
            nutritionDayFoodId,
            {
                mealType: "LUNCH",
                quantity: 150,
                estimatedCalories: 225,
                notes: "Registro actualizado"
            }
        );

    console.log("UPDATE:", updated);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
