import { ClientPlan } from "../models/ClientPlan.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { ClientRepository } from "../repositories/ClientRepository.js";
import { TrainingPlanRepository } from "../repositories/TrainingPlanRepository.js";
import { ContractRepository } from "../repositories/ContractRepository.js";
import { ContractService } from "./ContractService.js";
import { pool } from "../database/connection.js";

const DEFAULT_CONDITIONS =
    "Condiciones generales del servicio de entrenamiento FitCore.";

export class ClientPlanService {

    static async create(data) {
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

        // Solo un plan ACTIVE por cliente; los históricos no compiten.
        if (data.status === "ACTIVE") {
            const activePlans =
                await ClientPlanRepository.findActiveByClientId(
                    data.clientId
                );

            if (activePlans.length > 0) {
                throw new Error(
                    "El cliente ya tiene un plan de entrenamiento activo."
                );
            }
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const clientPlanId =
                await ClientPlanRepository.create(
                    new ClientPlan(data),
                    connection
                );

            // Contrato automático (no aplica a asignaciones canceladas).
            if (data.status !== "CANCELLED") {
                await ContractService.create(
                    {
                        clientPlanId,
                        contractNumber:
                            `CT-${String(clientPlanId).padStart(5, "0")}`,
                        conditions:
                            data.conditions?.trim() || DEFAULT_CONDITIONS,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        price: data.agreedPrice,
                        status: data.status
                    },
                    connection
                );
            }

            await connection.commit();
            return clientPlanId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const affected = await ClientPlanRepository.update(
                id,
                clientPlan,
                connection
            );

            const contract =
                await ContractRepository.findByClientPlanId(id, connection);

            if (contract) {
                await ContractRepository.update(
                    contract.id,
                    {
                        ...contract,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        price: data.agreedPrice,
                        status: data.status
                    },
                    connection
                );
            } else if (data.status !== "CANCELLED") {
                await ContractService.create(
                    {
                        clientPlanId: id,
                        contractNumber:
                            `CT-${String(id).padStart(5, "0")}`,
                        conditions: DEFAULT_CONDITIONS,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        price: data.agreedPrice,
                        status: data.status
                    },
                    connection
                );
            }

            await connection.commit();
            return affected;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const affected = await ClientPlanRepository.cancel(
                id,
                cancelledAt,
                cancellationReason,
                connection
            );

            const contract =
                await ContractRepository.findByClientPlanId(id, connection);

            if (contract) {
                await ContractRepository.updateStatus(
                    contract.id,
                    "CANCELLED",
                    connection
                );
            }

            await connection.commit();
            return affected;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}