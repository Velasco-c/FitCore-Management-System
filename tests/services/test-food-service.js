import { FoodService } from "../../src/services/FoodService.js";

const foodName = `Test Food ${Date.now()}`;

console.log("========================================");
console.log("PRUEBA DE FOOD SERVICE");
console.log("========================================");

try {
    const foodId = await FoodService.create({
        name: foodName,
        caloriesPer100g: 150,
        unit: "g",
        status: "ACTIVE"
    });

    console.log("CREATE:", foodId);

    const food = await FoodService.findById(foodId);
    console.log("FIND BY ID:", food);

    const foodByName =
        await FoodService.findByName(foodName);

    console.log("FIND BY NAME:", foodByName);

    const foods = await FoodService.findAll();
    console.log("FIND ALL:", foods.length);

    const updated = await FoodService.update(foodId, {
        name: foodName,
        caloriesPer100g: 180,
        unit: "g",
        status: "ACTIVE"
    });

    console.log("UPDATE:", updated);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
