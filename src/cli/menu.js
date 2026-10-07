import inquirer from 'inquirer';

export async function showMainMenu() {
    const { option } = await inquirer.prompt([
        {
            type: 'select',
            name: 'option',
            message: 'Seleccione una opción:',
            choices: [
                {
                    name: 'Gestión de clientes',
                    value: 'clients'
                },
                {
                    name: 'Planes de entrenamiento',
                    value: 'trainingPlans'
                },
                {
                    name: 'Planes asignados',
                    value: 'clientPlans'
                },
                {
                    name: 'Contratos',
                    value: 'contracts'
                },
                {
                    name: 'Progreso físico',
                    value: 'progress'
                },
                {
                    name: 'Nutrición',
                    value: 'nutrition'
                },
                {
                    name: 'Alimentos',
                    value: 'foods'
                },
                {
                    name: 'Finanzas',
                    value: 'financial'
                },
                {
                    name: 'Respaldos y Restauración',
                    value: 'backups'
                },
                {
                    name: 'Salir',
                    value: 'exit'
                }
            ]
        }
    ]);

    return option;
}