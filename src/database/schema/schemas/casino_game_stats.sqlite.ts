import type Database from 'better-sqlite3';

import type { DatabaseSchema } from '../../types/DatabaseSchema.ts';

export const casinoGameStatsSchema: DatabaseSchema = {
  name: 'casino_game_stats',
  ensure(db: Database.Database) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS casino_game_stats (
      discord_id TEXT NOT NULL,
      game TEXT NOT NULL,            -- 'ROULETTE'
      bet_type TEXT NOT NULL,        -- 'COLOR', 'NUMBER', 'SPLIT', etc.
      bet_key TEXT NOT NULL,         -- 'RED', 'NUMBER_7', 'DOUBLE_STREET_10_15'
      outcome TEXT NOT NULL CHECK (outcome IN ('WIN', 'LOSS')),
      count INTEGER NOT NULL DEFAULT 0,

      PRIMARY KEY (discord_id, game, bet_type, bet_key, outcome)
    );`);
  },
};
