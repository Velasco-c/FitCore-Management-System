import inquirer from 'inquirer';

import {
    createClient,
    findClientById,
    findClientByEmail,
    findAllClients,
    updateClient,
    deactivateClient
} from '../commands/clientCommands.js';

async function getClientData() {
    const { firstName, lastName, email, phone, birthDate, gender, status } =
        await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Nombre:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Apellido:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Correo electrónico:'
            },
            {
                type: 'input',
                name: 'phone',
                message: 'Teléfono:'
            },
            {
                type: 'input',
                name: 'birthDate',
                message: 'Fecha de nacimiento (YYYY-MM-DD):'
            },
            {
                type: 'select',
                name: 'gender',
                message: 'Género:',
                choices: [
                    { name: 'Masculino', value: 'MALE' },
                    { name: 'Femenino', value: 'FEMALE' },
                    { name: 'Otro', value: 'OTHER' },
                    { name: 'Prefiero no especificar', value: null }
                ]
            },
            {
                type: 'select',
                name: 'status',
                message: 'Estado:',
                choices: [
                    { name: 'Activo', value: 'ACTIVE' },
                    { name: 'Inactivo', value: 'INACTIVE' }
                ]
            }
        ]);

    return {
        firstName,
        lastName,
        email,
        phone: phone || null,
        birthDate: birthDate || null,
        gender,
        status
    };
}

async function create() {
    const data = await getClientData();
    const client = await createClient(data);

    console.log('\nCliente registrado correctamente.');
    console.table([client]);
}

async function findById() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del cliente:'
        }
    ]);

    const client = await findClientById(Number(id));

    if (!client) {
        console.log('\nCliente no encontrado.');
        return;
    }

    console.table([client]);
}

async function findByEmail() {
    const { email } = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Correo electrónico:'
        }
    ]);

    const client = await findClientByEmail(email);

    if (!client) {
        console.log('\nCliente no encontrado.');
        return;
    }

    console.table([client]);
}

async function findAll() {
    const clients = await findAllClients();

    if (!clients.length) {
        console.log('\nNo hay clientes registrados.');
        return;
    }

    console.table(clients);
}

async function update() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del cliente a actualizar:'
        }
    ]);

    const existingClient = await findClientById(Number(id));

    if (!existingClient) {
        console.log('\nCliente no encontrado.');
        return;
    }

    const data = await getClientData();
    const client = await updateClient(Number(id), data);

    console.log('\nCliente actualizado correctamente.');
    console.table([client]);
}

async function deactivate() {
    const { id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'ID del cliente a desactivar:'
        }
    ]);

    const existingClient = await findClientById(Number(id));

    if (!existingClient) {
        console.log('\nCliente no encontrado.');
        return;
    }

    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `¿Desea desactivar al cliente ${existingClient.firstName} ${existingClient.lastName}?`,
            default: false
        }
    ]);

    if (!confirm) {
        console.log('\nOperación cancelada.');
        return;
    }

    const client = await deactivateClient(Number(id));

    console.log('\nCliente desactivado correctamente.');
    console.table([client]);
}

export async function showClientMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de clientes:',
                choices: [
                    { name: 'Registrar cliente', value: 'create' },
                    { name: 'Consultar cliente por ID', value: 'findById' },
                    { name: 'Consultar cliente por correo', value: 'findByEmail' },
                    { name: 'Listar clientes', value: 'findAll' },
                    { name: 'Actualizar cliente', value: 'update' },
                    { name: 'Desactivar cliente', value: 'deactivate' },
                    { name: 'Volver', value: 'back' }
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

                case 'findByEmail':
                    await findByEmail();
                    break;

                case 'findAll':
                    await findAll();
                    break;

                case 'update':
                    await update();
                    break;

                case 'deactivate':
                    await deactivate();
                    break;

                case 'back':
                    running = false;
                    break;
            }

            if (running) {
                await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'pause',
                        message: 'Presione Enter para continuar.'
                    }
                ]);
            }
        } catch (error) {
            console.error('\nError:', error.message);

            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'pause',
                    message: 'Presione Enter para continuar.'
                }
            ]);
        }
    }
}
