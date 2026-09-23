import { ProgressRecordService } from "../../src/services/ProgressRecordService.js";

console.log("========================================");
console.log("PRUEBA DE PROGRESS RECORD SERVICE");
console.log("========================================");

try {
    const recordId = await ProgressRecordService.create({
        clientPlanId: 1,
        recordDate: "2026-09-23",
        weightKg: 75,
        bodyFatPercentage: 20,
        waistCm: 85,
        chestCm: 100,
        armCm: 35,
        legCm: 55,
        photoUrl: null,
        comments: "Registro de prueba"
    });

    console.log("CREATE:", recordId);

    const record = await ProgressRecordService.findById(recordId);
    console.log("FIND BY ID:", record);

    const records =
        await ProgressRecordService.findByClientPlanId(1);

    console.log("FIND BY CLIENT PLAN:", records.length);

    const recordByDate =
        await ProgressRecordService.findByClientPlanAndDate(
            1,
            "2026-09-23"
        );

    console.log("FIND BY CLIENT PLAN AND DATE:", recordByDate);

    const allRecords = await ProgressRecordService.findAll();
    console.log("FIND ALL:", allRecords.length);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
