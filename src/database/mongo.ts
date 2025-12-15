import { MongoClient, Db } from 'mongodb';

import { logger } from '../shared/logger.ts';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;

  const uri = process.env.MONGO_DB_URI;
  const dbName = process.env.MONGO_DB_NAME;

  if (!uri || !dbName) throw new Error('Missing database environment variables');

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  db = client.db(dbName);

  logger.success(`Connected to ${dbName}`);

  return db;
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!client) return;

  await client.close();

  client = null;
  db = null;

  logger.success(`Disconnected from database safely`);
}

export function getDb(): Db {
  if (!db) throw new Error('Database not set');
  return db;
}