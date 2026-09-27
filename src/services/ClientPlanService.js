import { ClientPlan } from "../models/ClientPlan.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { ClientRepository } from "../repositories/ClientRepository.js";
import { TrainingPlanRepository } from "../repositories/TrainingPlanRepository.js";
import { ClientPlanValidator } from "../validators/ClientPlanValidator.js";

export class ClientPlanService {

    static async create(data) {
        const validatedData =
            ClientPlanValidator.validateCreate(data);

        const client =
            await ClientRepository.findById(
                validatedData.clientId
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
                validatedData.trainingPlanId
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
        const activePlan =
            await ClientPlanRepository.findActiveByClientId(
                validatedData.clientId
            );
        if (activePlan) {
            throw new Error(
                "El cliente ya tiene un plan de entrenamiento activo."
            );
        }
        const clientPlan =
            new ClientPlan(validatedData);

        return ClientPlanRepository.create(clientPlan);
    }

    static async findById(id) {
        return ClientPlanRepository.findById(id);
    }

    static async findByClientId(clientId) {
        return ClientPlanRepository.findByClientId(clientId);
    }

    static async findActiveByClientId(clientId) {
        return ClientPlanRepository.findActiveByClientId(
            clientId
        );
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

        const validatedData =
            ClientPlanValidator.validateUpdate(data);

        const client =
            await ClientRepository.findById(
                validatedData.clientId
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
                validatedData.trainingPlanId
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

        const clientPlan =
            new ClientPlan(validatedData);

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

        if (
            typeof cancellationReason !== "string" ||
            !cancellationReason.trim()
        ) {
            throw new Error(
                "El motivo de cancelación es obligatorio."
            );
        }

        if (!cancelledAt) {
            throw new Error(
                "La fecha de cancelación es obligatoria."
            );
        }

        return ClientPlanRepository.cancel(
            id,
            cancelledAt,
            cancellationReason.trim()
        );
    }
}