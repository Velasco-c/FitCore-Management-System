import { TrainingPlan } from "../models/TrainingPlan.js";
import { TrainingPlanRepository } from "../repositories/TrainingPlanRepository.js";

export class TrainingPlanService {

    static async create(data) {
        const existingPlan =
            await TrainingPlanRepository.findByName(
                data.name
            );
        if (existingPlan) {
            throw new Error(
                "Ya existe un plan de entrenamiento con ese nombre."
            );
        }

        const trainingPlan = new TrainingPlan(data);
        return TrainingPlanRepository.create(trainingPlan);
    }

    static async findById(id) {
        return TrainingPlanRepository.findById(id);
    }

    static async findByName(name) {
        return TrainingPlanRepository.findByName(name);
    }

    static async findAll() {
        return TrainingPlanRepository.findAll();
    }

    static async update(id, data) {
        const existingPlan =
            await TrainingPlanRepository.findById(id);
        if (!existingPlan) {
            throw new Error(
                "El plan de entrenamiento no existe."
            );
        }
        if (data.name !== existingPlan.name) {
            const planWithName =
                await TrainingPlanRepository.findByName(
                    data.name
                );
            if (
                planWithName &&
                planWithName.id !== Number(id)
            ) {
                throw new Error(
                    "Ya existe otro plan con ese nombre."
                );
            }
        }
        const trainingPlan =
            new TrainingPlan(data);
        return TrainingPlanRepository.update(
            id,
            trainingPlan
        );
    }

    static async deactivate(id) {
        const existingPlan =
            await TrainingPlanRepository.findById(id);
        if (!existingPlan) {
            throw new Error(
                "El plan de entrenamiento no existe."
            );
        }

        if (existingPlan.status === "INACTIVE") {
            throw new Error(
                "El plan de entrenamiento ya está inactivo."
            );
        }
        return TrainingPlanRepository.deactivate(id);
    }
}