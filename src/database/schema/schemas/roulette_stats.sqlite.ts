import type Database from 'better-sqlite3';

import type { DatabaseSchema } from '../../types/DatabaseSchema.ts';

export const rouletteStatsSchema: DatabaseSchema = {
  name: 'roulette_stats',
  ensure(db: Database.Database) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS roulette_stats (
      discord_id TEXT PRIMARY KEY,

      spins_played INTEGER NOT NULL DEFAULT 0,

      baleh_bucks_won INTEGER NOT NULL DEFAULT 0,
      baleh_bucks_lost INTEGER NOT NULL DEFAULT 0,

      largest_win INTEGER NOT NULL DEFAULT 0,
      largest_loss INTEGER NOT NULL DEFAULT 0,

      bets_won INTEGER NOT NULL DEFAULT 0,
      bets_lost INTEGER NOT NULL DEFAULT 0);`
    );
  },
};
