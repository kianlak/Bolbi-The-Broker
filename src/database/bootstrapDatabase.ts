import { SQLITE_DB_NAME } from '../config/env.ts';

import { logger } from '../shared/logger.ts';

import { ensureSchemas } from './schema/ensureSchemas.ts';
import { initSqliteDB } from './sqlite.ts';

export async function bootstrapDatabase() {
  logger.starting('[BOT] Starting DB Bootstrap');
  
  try {
    const db = initSqliteDB({ filename: SQLITE_DB_NAME!, });
    await ensureSchemas(db);
  } catch (error) {
    logger.error('[BOT] Database bootstrap failed with ', error);
    process.exit(1);
  }

  logger.success('[BOT] Database Bootstrap completed');
}
