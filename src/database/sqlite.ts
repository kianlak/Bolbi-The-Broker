import Database from 'better-sqlite3';
import path from 'path';

import { logger } from '../shared/logger.ts';

let db: Database.Database | null = null;

export function connectToSqliteDB(): Database.Database {
  if (db) return db;

  const dbPath = path.resolve('src', 'database', `${process.env.SQLITE_DB_NAME}`);

  db = new Database(dbPath);
  db.prepare('SELECT 1').get();

  logger.success('Connected to database');
  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error('Database is not initialized');

  return db;
}

export function closeSqliteDBConnection() {
  if (!db) return;

  db.close();
  db = null;

  logger.success('Disconnected from database');
}
