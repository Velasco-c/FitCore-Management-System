import inquirer from 'inquirer';

import {
    createContract,
    findContractById,
    findContractByClientPlanId,
    findContractByNumber,
    findAllContracts,
    updateContract,
    updateContractStatus
} from '../commands/contractCommands.js';

async function getContractData() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación:'
        },
        {
            type: 'input',
            name: 'contractNumber',
            message: 'Número de contrato:'
        },
        {
            type: 'input',
            name: 'conditions',
            message: 'Condiciones:'
        },
        {
            type: 'input',
            name: 'startDate',
            message: 'Fecha de inicio (YYYY-MM-DD):'
        },
        {
            type: 'input',
            name: 'endDate',
            message: 'Fecha de finalización (YYYY-MM-DD):'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Precio:'
        },
        {
            type: 'select',
            name: 'status',
            message: 'Estado:',
            choices: [
                {
                    name: 'Activo',
                    value: 'ACTIVE'
                },
                {
                    name: 'Finalizado',
                    value: 'COMPLETED'
                },
                {
                    name: 'Cancelado',
                    value: 'CANCELLED'
                }
            ]
        }
    ]);
}

async function create() {
    const data = await getContractData();

    const contract = await createContract(data);

    console.log('\nContrato creado correctamente.');
    console.table([contract]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del contrato:'
        }
    ]);

    const contract = await findContractById(id);

    if (!contract) {
        console.log('\nContrato no encontrado.');
        return;
    }

    console.table([contract]);
}

async function findByClientPlan() {
    const { clientPlanId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'clientPlanId',
            message: 'ID de la asignación:'
        }
    ]);

    const contract =
        await findContractByClientPlanId(clientPlanId);

    if (!contract) {
        console.log('\nContrato no encontrado.');
        return;
    }

    console.table([contract]);
}

async function findByNumber() {
    const { contractNumber } = await inquirer.prompt([
        {
            type: 'input',
            name: 'contractNumber',
            message: 'Número de contrato:'
        }
    ]);

    const contract =
        await findContractByNumber(contractNumber);

    if (!contract) {
        console.log('\nContrato no encontrado.');
        return;
    }

    console.table([contract]);
}

async function findAll() {
    const contracts = await findAllContracts();

    if (!contracts.length) {
        console.log('\nNo existen contratos registrados.');
        return;
    }

    console.table(contracts);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del contrato:'
        }
    ]);

    const existingContract = await findContractById(id);

    if (!existingContract) {
        console.log('\nContrato no encontrado.');
        return;
    }

    const data = await getContractData();

    const contract = await updateContract(id, data);

    console.log('\nContrato actualizado correctamente.');
    console.table([contract]);
}

async function updateStatusAction() {
    const { id, status } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del contrato:'
        },
        {
            type: 'select',
            name: 'status',
            message: 'Nuevo estado:',
            choices: [
                {
                    name: 'Activo',
                    value: 'ACTIVE'
                },
                {
                    name: 'Finalizado',
                    value: 'COMPLETED'
                },
                {
                    name: 'Cancelado',
                    value: 'CANCELLED'
                }
            ]
        }
    ]);

    await updateContractStatus(id, status);

    console.log('\nEstado actualizado correctamente.');
}

export async function showContractMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de contratos:',
                choices: [
                    {
                        name: 'Crear contrato',
                        value: 'create'
                    },
                    {
                        name: 'Consultar contrato por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar por asignación',
                        value: 'findByClientPlan'
                    },
                    {
                        name: 'Consultar por número',
                        value: 'findByNumber'
                    },
                    {
                        name: 'Listar contratos',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar contrato',
                        value: 'update'
                    },
                    {
                        name: 'Cambiar estado',
                        value: 'updateStatus'
                    },
                    {
                        name: 'Volver',
                        value: 'back'
                    }
                ]
            }
        ]);

        try {
            switch (option) {
                case 'create':
                    await create();
                    break;

                case 'findById':
                    await findById();
                    break;

                case 'findByClientPlan':
                    await findByClientPlan();
                    break;

                case 'findByNumber':
                    await findByNumber();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
                    break;

                case 'updateStatus':
                    await updateStatusAction();
                    break;

                case 'back':
                    running = false;
                    break;
            }
        } catch (error) {
            console.error(`\nError: ${error.message}`);
        }

        if (running) {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'continue',
                    message: 'Presione ENTER para continuar.'
                }
            ]);
        }
    }
}