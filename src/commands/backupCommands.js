import { BackupService } from '../services/BackupService.js';

export async function executeBackup(selectedTables = null) {
    return BackupService.createBackup(selectedTables);
}

export async function getBackupList() {
    return BackupService.listBackups();
}

export async function validateBackup(fileName) {
    return BackupService.validateBackupFile(fileName);
}

export async function executeRestore(fileName, options) {
    return BackupService.restoreBackup(fileName, options);
}

export function getAllSystemTables() {
    return BackupService.TABLES;
}