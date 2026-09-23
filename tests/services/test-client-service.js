import { ClientService } from "../../src/services/ClientService.js";

const testEmail = `test.client.${Date.now()}@fitcore.test`;

console.log("========================================");
console.log("PRUEBA DE CLIENT SERVICE");
console.log("========================================");

try {
    const clientId = await ClientService.create({
        firstName: "Test",
        lastName: "Client",
        email: testEmail,
        phone: "00000000",
        birthDate: "2000-01-01",
        gender: "OTHER",
        status: "ACTIVE"
    });

    console.log("CREATE:", clientId);

    const client = await ClientService.findById(clientId);
    console.log("FIND BY ID:", client);

    const clientByEmail = await ClientService.findByEmail(testEmail);
    console.log("FIND BY EMAIL:", clientByEmail);

    const clients = await ClientService.findAll();
    console.log("FIND ALL:", clients.length);

    const updated = await ClientService.update(clientId, {
        firstName: "Updated",
        lastName: "Client",
        email: testEmail,
        phone: "11111111",
        birthDate: "2000-01-01",
        gender: "OTHER",
        status: "ACTIVE"
    });

    console.log("UPDATE:", updated);

    console.log("========================================");
    console.log("PRUEBA FINALIZADA CORRECTAMENTE");
    console.log("========================================");
} catch (error) {
    console.error("ERROR:", error.message);
}
