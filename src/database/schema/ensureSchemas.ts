import type Database from 'better-sqlite3';

import { logger } from '../../shared/logger.ts';

import { schemaRegistry } from './schemaRegistry.ts';

export async function ensureSchemas(db: Database.Database) {
  db.exec('BEGIN');

  try {
    for (const schema of schemaRegistry) {
      logger.info(`Ensuring schema: ${schema.name}`);
      schema.ensure(db);
    }

    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}
