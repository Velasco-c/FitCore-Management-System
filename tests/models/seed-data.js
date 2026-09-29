import { pool } from "../../src/database/connection.js";

import { createClient } from "../../src/commands/clientCommands.js";
import { createTrainingPlan } from "../../src/commands/trainingPlanCommands.js";
import {
    createClientPlan,
    cancelClientPlan
} from "../../src/commands/clientPlanCommands.js";
import { findContractByClientPlanId } from "../../src/commands/contractCommands.js";
import { createFinancialTransaction } from "../../src/commands/financialCommands.js";
import { createFood, findFoodByName } from "../../src/commands/foodCommands.js";
import { createNutritionPlan } from "../../src/commands/nutritionPlanCommands.js";
import { createNutritionDay } from "../../src/commands/nutritionDayCommands.js";
import { createNutritionDayFood } from "../../src/commands/nutritionDayFoodCommands.js";
import { createProgressRecord } from "../../src/commands/progressCommands.js";


const TAG = String(Date.now()).slice(-6);

function mulberry32(seed) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const random = mulberry32(2026);
const between = (min, max, decimals = 1) =>
    Number((min + random() * (max - min)).toFixed(decimals));

function addDays(dateStr, days) {
    const date = new Date(`${dateStr}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
}

const summary = {};
const failures = [];

function count(entity) {
    summary[entity] = (summary[entity] ?? 0) + 1;
}

async function step(entity, label, fn) {
    try {
        const result = await fn();
        count(entity);
        return result;
    } catch (error) {
        failures.push(`${entity} | ${label}: ${error.message}`);
        return null;
    }
}



const CLIENTS = [
    ["Andrea", "Morales", "FEMALE", "1994-03-12"],
    ["Luis", "Ramírez", "MALE", "1989-07-25"],
    ["Sofía", "Hernández", "FEMALE", "1998-11-02"],
    ["Carlos", "Pérez", "MALE", "1985-01-30"],
    ["Valeria", "López", "FEMALE", "2001-05-18"],
    ["Diego", "García", "MALE", "1992-09-09"],
    ["Camila", "Méndez", "FEMALE", "1996-12-21"],
    ["Alex", "Castillo", "OTHER", "1999-04-04"]
];

const TRAINING_PLANS = [
    ["Fuerza Base", 8, "BEGINNER", 450, "Ganar fuerza general"],
    ["Hipertrofia Intermedia", 12, "INTERMEDIATE", 650, "Aumentar masa muscular"],
    ["Definición Avanzada", 10, "ADVANCED", 750, "Reducir grasa corporal"],
    ["Acondicionamiento Funcional", 6, "BEGINNER", 380, "Mejorar condición física"]
];

const CLIENT_PLANS = [
    { client: 0, training: 0, start: "2026-08-03", status: "ACTIVE" },
    { client: 1, training: 1, start: "2026-07-20", status: "ACTIVE" },
    { client: 2, training: 3, start: "2026-08-24", status: "ACTIVE" },
    { client: 3, training: 2, start: "2026-08-10", status: "ACTIVE" },
    { client: 4, training: 0, start: "2026-09-07", status: "ACTIVE" },
    { client: 5, training: 1, start: "2026-01-05", status: "COMPLETED" },
    { client: 5, training: 2, start: "2026-09-14", status: "ACTIVE" },
    { client: 6, training: 3, start: "2026-08-17", status: "CANCELLED" },
    { client: 7, training: 0, start: "2026-02-02", status: "EXPIRED" }
];

const FOODS = [
    ["Avena", 389], ["Huevo entero", 155], ["Pechuga de pollo", 165],
    ["Arroz blanco cocido", 130], ["Frijol negro cocido", 132],
    ["Plátano", 89], ["Aguacate", 160], ["Tortilla de maíz", 218],
    ["Atún en agua", 116], ["Yogur natural", 61],
    ["Camote cocido", 86], ["Almendras", 579]
];

const MEALS = ["BREAKFAST", "LUNCH", "SNACK", "DINNER"];
const PAYMENT_METHODS = ["CARD", "CASH", "TRANSFER"];


console.log("========================================");
console.log(`SEED DE DATOS SINTÉTICOS (TAG ${TAG})`);
console.log("========================================");

try {
    const clientIds = [];
    for (const [firstName, lastName, gender, birthDate] of CLIENTS) {
        const id = await step("clients", `${firstName} ${lastName}`, () =>
            createClient({
                firstName,
                lastName,
                email: `${firstName}.${lastName}.${TAG}@fitcore.test`
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                phone: `5${String(random()).slice(2, 9)}`,
                birthDate,
                gender,
                status: "ACTIVE"
            })
        );
        clientIds.push(id);
    }

    const trainingPlanIds = [];
    for (const [name, durationWeeks, level, price, goal] of TRAINING_PLANS) {
        const id = await step("training_plans", name, () =>
            createTrainingPlan({
                name: `${name} ${TAG}`,
                description: `Programa de ${durationWeeks} semanas`,
                durationWeeks,
                physicalGoals: goal,
                level,
                price,
                status: "ACTIVE"
            })
        );
        trainingPlanIds.push(id);
    }

    const plans = [];
    for (const scenario of CLIENT_PLANS) {
        const [, weeks, , price, goal] = TRAINING_PLANS[scenario.training];
        const clientId = clientIds[scenario.client];
        const trainingPlanId = trainingPlanIds[scenario.training];
        if (!clientId || !trainingPlanId) continue;

        const endDate = addDays(scenario.start, weeks * 7 - 1);
        const agreedPrice = scenario.client % 2 === 0
            ? price
            : Number((price * 0.9).toFixed(2));

        const id = await step("client_plans", `cliente ${scenario.client}`, () =>
            createClientPlan({
                clientId,
                trainingPlanId,
                startDate: scenario.start,
                endDate,
                status: scenario.status === "CANCELLED" ? "ACTIVE" : scenario.status,
                agreedPrice,
                goal,
                conditions:
                    "Asistencia mínima de 3 sesiones por semana. " +
                    "Cancelación con 7 días de aviso.",
                cancelledAt: null,
                cancellationReason: null
            })
        );
        if (!id) continue;

        if (scenario.status === "CANCELLED") {
            await step("client_plans_cancelled", `plan ${id}`, () =>
                cancelClientPlan(
                    id,
                    `${addDays(scenario.start, 10)} 10:00:00`,
                    "El cliente se mudó de ciudad"
                )
            );
        }

        plans.push({ id, ...scenario, endDate, agreedPrice });
    }

    const usable = plans.filter(p => p.status !== "CANCELLED");

    // Los contratos los genera automáticamente ClientPlanService.create
    // (y los cancela ClientPlanService.cancel). Aquí solo se verifican.
    for (const plan of plans) {
        await step("contracts", `plan ${plan.id}`, async () => {
            const contract = await findContractByClientPlanId(plan.id);
            if (!contract) {
                throw new Error("No se generó el contrato automático.");
            }
            if (contract.status !== plan.status) {
                throw new Error(
                    `Contrato ${contract.status}, se esperaba ${plan.status}.`
                );
            }
            return contract.id;
        });
    }

    let pay = 0;
    for (const plan of plans) {
        await step("financial_transactions", `ingreso plan ${plan.id}`, () =>
            createFinancialTransaction({
                clientPlanId: plan.id,
                type: "INCOME",
                category: "MEMBERSHIP",
                amount: plan.agreedPrice,
                transactionDate: plan.start,
                paymentMethod: PAYMENT_METHODS[pay++ % PAYMENT_METHODS.length],
                description: `Pago de plan #${plan.id}`,
                reference: `REC-${TAG}-${plan.id}`,
                status: plan.status === "CANCELLED" ? "CANCELLED" : "COMPLETED"
            })
        );
    }

    const expenses = [
        ["Renta del local", 3500],
        ["Electricidad", 820.5],
        ["Mantenimiento de equipo", 640],
        ["Insumos de limpieza", 215.75]
    ];
    for (const [description, amount] of expenses) {
        await step("financial_transactions", description, () =>
            createFinancialTransaction({
                clientPlanId: null,
                type: "EXPENSE",
                category: "OPERATING",
                amount,
                transactionDate: "2026-09-01",
                paymentMethod: "TRANSFER",
                description,
                reference: null,
                status: "COMPLETED"
            })
        );
    }

    const foods = [];
    for (const [name, kcal] of FOODS) {
        const existing = await findFoodByName(name).catch(() => null);
        const id = existing
            ? existing.id
            : await step("foods", name, () =>
                createFood({
                    name,
                    caloriesPer100g: kcal,
                    unit: "g",
                    status: "ACTIVE"
                })
            );
        if (id) foods.push({ id, kcal });
    }

    const activePlans = usable.filter(p => p.status === "ACTIVE").slice(0, 4);
    for (const plan of activePlans) {
        const nutritionPlanId = await step("nutrition_plans", `plan ${plan.id}`, () =>
            createNutritionPlan({
                clientPlanId: plan.id,
                name: `Nutrición asignación ${plan.id}`,
                description: "Plan nutricional de apoyo al entrenamiento",
                dailyCalorieTarget: 2000 + (plan.id % 5) * 100,
                startDate: plan.start,
                endDate: plan.endDate,
                status: "ACTIVE"
            })
        );
        if (!nutritionPlanId || !foods.length) continue;

        for (let d = 0; d < 3; d++) {
            const dayDate = addDays(plan.start, d);
            const nutritionDayId = await step("nutrition_days", dayDate, () =>
                createNutritionDay({
                    nutritionPlanId,
                    dayDate,
                    notes: `Día ${d + 1} del plan`
                })
            );
            if (!nutritionDayId) continue;

            for (let m = 0; m < MEALS.length; m++) {
                const food = foods[(d * 4 + m + plan.id) % foods.length];
                const quantity = between(80, 250, 0);
                await step("nutrition_day_foods", `${MEALS[m]} día ${d + 1}`, () =>
                    createNutritionDayFood({
                        nutritionDayId,
                        foodId: food.id,
                        mealType: MEALS[m],
                        quantity,
                        estimatedCalories: Math.round((quantity / 100) * food.kcal),
                        notes: null
                    })
                );
            }
        }
    }

    for (const plan of usable) {
        let weight = between(62, 95);
        let fat = between(16, 30);
        for (let week = 0; week < 4; week++) {
            const recordDate = addDays(plan.start, week * 7);
            await step("progress_records", `plan ${plan.id} sem ${week + 1}`, () =>
                createProgressRecord({
                    clientPlanId: plan.id,
                    recordDate,
                    weightKg: weight,
                    bodyFatPercentage: fat,
                    waistCm: between(70, 100),
                    chestCm: between(88, 115),
                    armCm: between(27, 40),
                    legCm: between(50, 68),
                    photoUrl: null,
                    comments: week === 0 ? "Medición inicial" : null
                })
            );
            weight = Number((weight - between(0.2, 0.9)).toFixed(1));
            fat = Number((fat - between(0.1, 0.6)).toFixed(1));
        }
    }
} catch (error) {
    failures.push(`FATAL: ${error.message}`);
} finally {
    console.log("\nRESUMEN DE INSERCIONES");
    console.table(summary);

    if (failures.length) {
        console.log(`\nFALLOS (${failures.length}):`);
        failures.forEach(f => console.log(" -", f));
        process.exitCode = 1;
    } else {
        console.log("\nSEED FINALIZADO SIN ERRORES");
    }

    await pool.end();
}