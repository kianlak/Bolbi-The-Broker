import type Database from 'better-sqlite3';

import type { DatabaseSchema } from '../../types/DatabaseSchema.ts';

export const rouletteSpinStatsSchema: DatabaseSchema = {
  name: 'roulette_spin_stats',
  ensure(db: Database.Database) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS roulette_spin_stats (
      discord_id TEXT NOT NULL,
      spin_number INTEGER NOT NULL, -- 0-36, 37 = 00
      count INTEGER NOT NULL DEFAULT 0,

      PRIMARY KEY (discord_id, spin_number)
    );`
    );
  },
};
