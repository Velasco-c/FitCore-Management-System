import inquirer from 'inquirer';

import {
    createClientPlan,
    findClientPlanById,
    findClientPlansByClientId,
    findActiveClientPlan,
    findAllClientPlans,
    updateClientPlan,
    cancelClientPlan
} from '../commands/clientPlanCommands.js';

async function getClientPlanData({ isUpdate = false } = {}) {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'clientId',
            message: 'ID del cliente:',
            when: () => !isUpdate,
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'trainingPlanId',
            message: 'ID del plan de entrenamiento:',
            filter: value => Number(value)
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
            type: 'select',
            name: 'status',
            message: 'Estado:',
            choices: [
                {
                    name: 'Activo',
                    value: 'ACTIVE'
                },
                {
                    name: 'Completado',
                    value: 'COMPLETED'
                },
                {
                    name: 'Cancelado',
                    value: 'CANCELLED'
                },
                {
                    name: 'Expirado',
                    value: 'EXPIRED'
                }
            ]
        },
        {
            type: 'input',
            name: 'agreedPrice',
            message: 'Precio acordado:',
            filter: value => Number(value)
        },
        {
            type: 'input',
            name: 'goal',
            message: 'Objetivo:'
        },
        {
            type: 'input',
            name: 'cancelledAt',
            message: 'Fecha de cancelación (YYYY-MM-DD HH:mm:ss):',
            when: answers => answers.status === 'CANCELLED'
        },
        {
            type: 'input',
            name: 'cancellationReason',
            message: 'Motivo de cancelación:',
            when: answers => answers.status === 'CANCELLED'
        }
    ]);
}

async function create() {
    const data = await getClientPlanData();

    const clientPlan = await createClientPlan(data);

    console.log('\nPlan asignado correctamente.');
    console.table([clientPlan]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la asignación:',
            filter: value => Number(value)
        }
    ]);

    const clientPlan = await findClientPlanById(id);

    if (!clientPlan) {
        console.log('\nAsignación no encontrada.');
        return;
    }

    console.table([clientPlan]);
}

async function findByClientId() {
    const { clientId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'clientId',
            message: 'ID del cliente:',
            filter: value => Number(value)
        }
    ]);

    const plans = await findClientPlansByClientId(clientId);

    if (!plans.length) {
        console.log('\nEl cliente no tiene planes registrados.');
        return;
    }

    console.table(plans);
}

async function findActive() {
    const { clientId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'clientId',
            message: 'ID del cliente:',
            filter: value => Number(value)
        }
    ]);

    const clientPlan =
        await findActiveClientPlan(clientId);

    if (!clientPlan) {
        console.log('\nEl cliente no tiene un plan activo.');
        return;
    }

    console.table([clientPlan]);
}

async function findAll() {
    const plans = await findAllClientPlans();

    if (!plans.length) {
        console.log('\nNo existen asignaciones.');
        return;
    }

    console.table(plans);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la asignación:',
            filter: value => Number(value)
        }
    ]);

    const existingPlan = await findClientPlanById(id);

    if (!existingPlan) {
        console.log('\nAsignación no encontrada.');
        return;
    }

    const data = await getClientPlanData({ isUpdate: true });

    const clientPlan =
        await updateClientPlan(id, data);

    console.log('\nAsignación actualizada correctamente.');
    console.table([clientPlan]);
}

async function cancel() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID de la asignación:',
            filter: value => Number(value)
        }
    ]);

    const existingPlan = await findClientPlanById(id);

    if (!existingPlan) {
        console.log('\nAsignación no encontrada.');
        return;
    }

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: '¿Desea cancelar esta asignación?',
            default: false
        }
    ]);

    if (!confirm) {
        console.log('\nOperación cancelada.');
        return;
    }

    const {
        cancelledAt,
        cancellationReason
    } = await inquirer.prompt([
        {
            type: 'input',
            name: 'cancelledAt',
            message: 'Fecha de cancelación (YYYY-MM-DD HH:mm:ss):'
        },
        {
            type: 'input',
            name: 'cancellationReason',
            message: 'Motivo de cancelación:'
        }
    ]);

    await cancelClientPlan(
        id,
        cancelledAt,
        cancellationReason
    );

    console.log('\nAsignación cancelada correctamente.');
}

export async function showClientPlanMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de planes asignados:',
                choices: [
                    {
                        name: 'Asignar plan a cliente',
                        value: 'create'
                    },
                    {
                        name: 'Consultar asignación por ID',
                        value: 'findById'
                    },
                    {
                        name: 'Consultar planes de un cliente',
                        value: 'findByClientId'
                    },
                    {
                        name: 'Consultar plan activo de un cliente',
                        value: 'findActive'
                    },
                    {
                        name: 'Listar asignaciones',
                        value: 'findAll'
                    },
                    {
                        name: 'Actualizar asignación',
                        value: 'update'
                    },
                    {
                        name: 'Cancelar asignación',
                        value: 'cancel'
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

                case 'findByClientId':
                    await findByClientId();
                    break;

                case 'findActive':
                    await findActive();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
                    break;

                case 'cancel':
                    await cancel();
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