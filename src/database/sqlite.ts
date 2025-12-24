import Database from 'better-sqlite3';
import path from 'path';

import type { SqliteConfig } from './types/SqliteConfig.ts';

import { logger } from '../shared/logger.ts';

import { SQLITE_DB_NAME } from '../config/env.ts';

let db: Database.Database | undefined;

export function initSqliteDB(config: SqliteConfig): Database.Database {
  if (db) return db;

  const basePath = config.basePath ?? path.resolve('src', 'database');
  const dbPath = path.join(basePath, config.filename);

  db = new Database(dbPath);
  db.prepare('SELECT 1').get(); // Ping

  logger.info(`[BOT] Connected to DB (${SQLITE_DB_NAME})`);
  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error('SQLite database not initialized');

  return db;
}

export function shutdownSqliteDB() {
  if (!db) return;

  db.close();
  db = undefined;

  logger.info('[BOT] Disconnected DB');
}
