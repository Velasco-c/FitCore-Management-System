import inquirer from 'inquirer';
import {
    executeBackup,
    getBackupList,
    validateBackup,
    executeRestore,
    getAllSystemTables
} from '../commands/backupCommands.js';

async function handleBackup() {
    const { backupType } = await inquirer.prompt([
        {
            type: 'select',
            name: 'backupType',
            message: 'Tipo de respaldo:',
            choices: [
                { name: 'Respaldo Completo (Todas las colecciones)', value: 'full' },
                { name: 'Respaldo Seleccionado (Elegir colecciones)', value: 'custom' }
            ]
        }
    ]);

    let selectedTables = null;

    if (backupType === 'custom') {
        const { tables } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'tables',
                message: 'Seleccione las colecciones a respaldar:',
                choices: getAllSystemTables().map(table => ({ name: table, value: table }))
            }
        ]);

        if (tables.length === 0) {
            console.log('\nDebe seleccionar al menos una colección.');
            return;
        }
        selectedTables = tables;
    }

    const result = await executeBackup(selectedTables);
    console.log(`\n✅ Respaldo generado con éxito:`);
    console.log(`   Archivo: ${result.fileName}`);
    console.log(`   Colecciones: ${result.tablesCount}`);
    console.log(`   Registros exportados: ${result.recordsCount}`);
}

async function handleRestore() {
    const backups = await getBackupList();

    if (backups.length === 0) {
        console.log('\n⚠️ No se encontraron archivos de respaldo en /backups.');
        return;
    }

    const { selectedFile } = await inquirer.prompt([
        {
            type: 'select',
            name: 'selectedFile',
            message: 'Seleccione el archivo de respaldo a restaurar:',
            choices: backups.map(file => ({ name: file, value: file }))
        }
    ]);

    console.log('\nValidando compatibilidad de esquema...');
    const parsedBackup = await validateBackup(selectedFile);
    console.log('✅ Esquema válido.');
    console.log(`   Fecha de creación: ${parsedBackup.metadata.timestamp}`);
    console.log(`   Colecciones incluidas: ${parsedBackup.metadata.tablesIncluded.join(', ')}`);

    const { confirmCritical } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmCritical',
            message: '⚠️ ¡ATENCIÓN! Esta acción sobrescribirá las colecciones seleccionadas en la base de datos actual. ¿Desea continuar?',
            default: false
        }
    ]);

    if (!confirmCritical) {
        console.log('\nOperación de restauración cancelada por el usuario.');
        return;
    }

    console.log('\nEjecutando restauración atómica...');
    const result = await executeRestore(selectedFile, { mode: 'overwrite' });

    console.log('\n✅ Restauración completada exitosamente.');
    console.log(`   Colecciones restauradas: ${result.restoredTables}`);
    console.log(`   Registros importados: ${result.totalRecords}`);
}

export async function showBackupMenu() {
    let running = true;

    while (running) {
        const { option } = await inquirer.prompt([
            {
                type: 'select',
                name: 'option',
                message: 'Gestión de Respaldos y Restauración:',
                choices: [
                    { name: 'Generar copia de seguridad (Backup)', value: 'backup' },
                    { name: 'Restaurar copia de seguridad (Restore)', value: 'restore' },
                    { name: 'Volver', value: 'back' }
                ]
            }
        ]);

        try {
            switch (option) {
                case 'backup':
                    await handleBackup();
                    break;
                case 'restore':
                    await handleRestore();
                    break;
                case 'back':
                    running = false;
                    break;
            }
        } catch (error) {
            console.error(`\n❌ Error: ${error.message}`);
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