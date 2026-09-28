import { Contract } from "../models/Contract.js";
import { ContractRepository } from "../repositories/ContractRepository.js";
import { ClientPlanRepository } from "../repositories/ClientPlanRepository.js";
import { ContractValidator } from "../validators/ContractValidator.js";

export class ContractService {

    static async create(data) {
        const validatedData =
            ContractValidator.validateCreate(data);
        const clientPlan =
            await ClientPlanRepository.findById(
                validatedData.clientPlanId
            );

        if (!clientPlan) {
            throw new Error(
                "La asignación del plan no existe."
            );
        }

        if (clientPlan.status === "CANCELLED") {
            throw new Error(
                "No se puede crear un contrato para una asignación cancelada."
            );
        }

        const existingContract =
            await ContractRepository.findByClientPlanId(
                validatedData.clientPlanId
            );
        if (existingContract) {
            throw new Error(
                "La asignación ya tiene un contrato."
            );
        }
        const contract =
            new Contract(validatedData);
        return ContractRepository.create(contract);
    }

    static async findById(id) {
        return ContractRepository.findById(id);
    }

    static async findByClientPlanId(clientPlanId) {
        return ContractRepository.findByClientPlanId(
            clientPlanId
        );
    }

    static async findByNumber(contractNumber) {
        return ContractRepository.findByNumber(
            contractNumber
        );
    }

    static async findAll() {
        return ContractRepository.findAll();
    }

    static async update(id, data) {
    const existingContract =
        await ContractRepository.findById(id);

    if (!existingContract) {
        throw new Error("El contrato no existe.");
    }

    const validatedData =
        ContractValidator.validateUpdate({
            ...data,
            clientPlanId: existingContract.clientPlanId
        });

    const contract =
        new Contract(validatedData);

    return ContractRepository.update(
        id,
        contract
    );
    }

    static async updateStatus(id, status) {
        const existingContract =
            await ContractRepository.findById(id);
        if (!existingContract) {
            throw new Error("El contrato no existe.");
        }
        return ContractRepository.updateStatus(
            id,
            status
        );
    }
}