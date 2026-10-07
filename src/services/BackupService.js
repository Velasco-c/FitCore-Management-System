import fs from 'fs/promises';
import path from 'path';
import { pool } from '../database/connection.js';

export class BackupService {
    static TABLES = [
        'clients',
        'training_plans',
        'client_plans',
        'contracts',
        'progress_records',
        'nutrition_plans',
        'nutrition_days',
        'foods',
        'nutrition_day_foods',
        'financial_transactions'
    ];

    static BACKUP_DIR = path.join(process.cwd(), 'backups');

    static async ensureBackupDirectory() {
        try {
            await fs.mkdir(this.BACKUP_DIR, { recursive: true });
        } catch (error) {
            throw new Error(`Error al crear el directorio de backups: ${error.message}`);
        }
    }

    static async createBackup(selectedTables = null) {
        await this.ensureBackupDirectory();

        const tablesToExport = selectedTables && selectedTables.length > 0
            ? selectedTables
            : this.TABLES;

        const invalidTables = tablesToExport.filter(t => !this.TABLES.includes(t));
        if (invalidTables.length > 0) {
            throw new Error(`Tablas inválidas para respaldo: ${invalidTables.join(', ')}`);
        }

        const backupData = {
            metadata: {
                system: 'FitCore Management System',
                version: '1.0.0',
                timestamp: new Date().toISOString(),
                tablesIncluded: tablesToExport
            },
            data: {}
        };

        for (const table of tablesToExport) {
            const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
            backupData.data[table] = rows;
        }

        const timestampStr = new Date().toISOString()
            .replace(/:/g, '-')
            .replace(/\..+/, '');
        const fileName = `backup_${timestampStr}.json`;
        const filePath = path.join(this.BACKUP_DIR, fileName);

        await fs.writeFile(filePath, JSON.stringify(backupData, null, 2), 'utf-8');

        return {
            fileName,
            filePath,
            tablesCount: tablesToExport.length,
            recordsCount: Object.values(backupData.data).reduce((acc, rows) => acc + rows.length, 0)
        };
    }

    static async listBackups() {
        await this.ensureBackupDirectory();
        const files = await fs.readdir(this.BACKUP_DIR);
        return files.filter(file => file.startsWith('backup_') && file.endsWith('.json')).sort().reverse();
    }

    static async validateBackupFile(fileName) {
        const filePath = path.join(this.BACKUP_DIR, fileName);
        
        let rawContent;
        try {
            rawContent = await fs.readFile(filePath, 'utf-8');
        } catch {
            throw new Error(`El archivo ${fileName} no existe o no se puede leer.`);
        }

        let parsed;
        try {
            parsed = JSON.parse(rawContent);
        } catch {
            throw new Error('El archivo de respaldo no tiene un formato JSON válido.');
        }

        if (!parsed.metadata || !parsed.data) {
            throw new Error('Esquema incompatible: Falta la estructura de metadatos o datos.');
        }

        if (parsed.metadata.system !== 'FitCore Management System') {
            throw new Error('Esquema incompatible: El respaldo no pertenece a FitCore System.');
        }

        const fileTables = Object.keys(parsed.data);
        const unsupportedTables = fileTables.filter(t => !this.TABLES.includes(t));
        if (unsupportedTables.length > 0) {
            throw new Error(`Esquema incompatible: Contiene tablas no reconocidas (${unsupportedTables.join(', ')}).`);
        }

        return parsed;
    }

    static async restoreBackup(fileName, { mode = 'overwrite' } = {}) {
        const backupContent = await this.validateBackupFile(fileName);
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            await connection.query('SET FOREIGN_KEY_CHECKS = 0');

            const tablesInBackup = Object.keys(backupContent.data);

            if (mode === 'overwrite') {
                for (const table of tablesInBackup) {
                    await connection.query(`DELETE FROM \`${table}\``);
                }
            }

            for (const table of tablesInBackup) {
                const rows = backupContent.data[table];
                if (!rows || rows.length === 0) continue;

                const columns = Object.keys(rows[0]);
                const columnsSql = columns.map(col => `\`${col}\``).join(', ');
                const placeholders = columns.map(() => '?').join(', ');
                const insertSql = `INSERT INTO \`${table}\` (${columnsSql}) VALUES (${placeholders})`;

                for (const row of rows) {
                    const values = columns.map(col => {
                        const val = row[col];
                        if (val && typeof val === 'string' && val.match(/^\d{4}-\d{2}-\d{2}T/)) {
                            return val.replace('T', ' ').replace('Z', '');
                        }
                        return val;
                    });
                    await connection.query(insertSql, values);
                }
            }

            await connection.query('SET FOREIGN_KEY_CHECKS = 1');
            await connection.commit();

            return {
                restoredTables: tablesInBackup.length,
                totalRecords: Object.values(backupContent.data).reduce((acc, r) => acc + r.length, 0)
            };
        } catch (error) {
            try {
                await connection.rollback();
                await connection.query('SET FOREIGN_KEY_CHECKS = 1');
            } catch (_) {
                // Manejo secundario si falla la reversión
            }
            throw new Error(`Error crítico durante la restauración. Se revirtieron los cambios: ${error.message}`);
        } finally {
            connection.release();
        }
    }
}