import type Database from 'better-sqlite3';

export type DatabaseSchema = {
  name: string;
  ensure: (db: Database.Database) => void;
};
