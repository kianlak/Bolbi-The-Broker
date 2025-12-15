import { MongoClient, Db } from 'mongodb';

import { logger } from '../shared/logger.ts';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectMongo(): Promise<Db> {
  if (db) {
    return db;
  }

  const uri = process.env.MONGO_DB_URI;
  const dbName = process.env.MONGO_DB_NAME;

  if (!uri || !dbName) {
    throw new Error('Missing MongoDB environment variables');
  }

  logger.info('[DB] Connecting to MongoDB');

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();

  db = client.db(dbName);

  // Ping to confirm connection
  await db.command({ ping: 1 });

  logger.success(`[DB] Connected to MongoDB (${dbName})`);

  return db;
}

export async function disconnectMongo(): Promise<void> {
  if (!client) return;

  logger.info('[DB] Disconnecting MongoDB');

  await client.close();

  client = null;
  db = null;

  logger.success('[DB] MongoDB disconnected');
}

export function getDb(): Db {
  if (!db) {
    throw new Error('MongoDB not initialized');
  }
  return db;
}