import type Database from 'better-sqlite3';

import type { DatabaseSchema } from '../types/DatabaseSchema.ts';

export const usersSchema: DatabaseSchema = {
  name: 'users',
  ensure(db: Database.Database) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        discord_id TEXT NOT NULL UNIQUE,
        baleh_bucks INTEGER NOT NULL DEFAULT 0
      );
    `);
  },
};
