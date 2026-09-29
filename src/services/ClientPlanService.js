import { ClientPlan } from "../models/ClientPlan.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { ClientRepository } from "../repositories/ClientRepository.js";
import { TrainingPlanRepository } from "../repositories/TrainingPlanRepository.js";
import { ContractService } from "./ContractService.js";

export class ClientPlanService {

    static async create(data, conditions) {
        const client =
            await ClientRepository.findById(
                data.clientId
            );

        if (!client) {
            throw new Error("El cliente no existe.");
        }

        if (client.status !== "ACTIVE") {
            throw new Error(
                "No se puede asignar un plan a un cliente inactivo."
            );
        }

        const trainingPlan =
            await TrainingPlanRepository.findById(
                data.trainingPlanId
            );

        if (!trainingPlan) {
            throw new Error(
                "El plan de entrenamiento no existe."
            );
        }

        if (trainingPlan.status !== "ACTIVE") {
            throw new Error(
                "No se puede asignar un plan de entrenamiento inactivo."
            );
        }

        const activePlans =
            await ClientPlanRepository.findActiveByClientId(
                data.clientId
            );

        if (activePlans.length > 0) {
            throw new Error(
                "El cliente ya tiene un plan de entrenamiento activo."
            );
        }

        const clientPlan =
            new ClientPlan(data);

        const clientPlanId =
            await ClientPlanRepository.create(clientPlan);

        if (data.status !== "CANCELLED") {
            await ContractService.create({
                clientPlanId,
                contractNumber: `CT-${String(clientPlanId).padStart(5, "0")}`,
                conditions,
                startDate: data.startDate,
                endDate: data.endDate,
                price: data.agreedPrice,
                status: data.status
            });
        }

        return clientPlanId;
    }

    static async findById(id) {
        return ClientPlanRepository.findById(id);
    }

    static async findByClientId(clientId) {
        return ClientPlanRepository.findByClientId(clientId);
    }

    static async findActiveByClientId(clientId) {

        return ClientPlanRepository.findActiveByClientId(clientId);

    }

    static async findAll() {
        return ClientPlanRepository.findAll();
    }

    static async update(id, data) {

        const existingPlan =
            await ClientPlanRepository.findById(id);

        if (!existingPlan) {
            throw new Error(
                "La asignación del plan no existe."
            );
        }

        const client =
            await ClientRepository.findById(
                existingPlan.clientId
            );

        if (!client) {
            throw new Error("El cliente no existe.");
        }

        if (client.status !== "ACTIVE") {
            throw new Error(
                "El cliente está inactivo."
            );
        }

        const trainingPlan =
            await TrainingPlanRepository.findById(
                data.trainingPlanId
            );

        if (!trainingPlan) {
            throw new Error(
                "El plan de entrenamiento no existe."
            );
        }

        if (trainingPlan.status !== "ACTIVE") {
            throw new Error(
                "El plan de entrenamiento está inactivo."
            );
        }

        if (data.status === "ACTIVE") {

            const activePlans =
                await ClientPlanRepository.findActiveByClientId(
                    existingPlan.clientId
                );

            const anotherActivePlan =
                activePlans.some(
                    (activePlan) => activePlan.id !== id
                );

            if (anotherActivePlan) {
                throw new Error(
                    "El cliente ya tiene otro plan de entrenamiento activo."
                );
            }
        }

        const clientPlan =
            new ClientPlan({
                ...data,
                clientId: existingPlan.clientId
            });

        return ClientPlanRepository.update(
            id,
            clientPlan
        );

    }

    static async cancel(id, cancelledAt, cancellationReason) {
        const existingPlan =
            await ClientPlanRepository.findById(id);

        if (!existingPlan) {
            throw new Error(
                "La asignación del plan no existe."
            );
        }

        if (existingPlan.status === "CANCELLED") {
            throw new Error(
                "La asignación ya está cancelada."
            );
        }

        return ClientPlanRepository.cancel(
            id,
            cancelledAt,
            cancellationReason
        );
    }
}
