import type Database from 'better-sqlite3';

import type { DatabaseSchema } from '../../types/DatabaseSchema.ts';

export const casinoGameStatsSchema: DatabaseSchema = {
  name: 'casino_game_stats',
  ensure(db: Database.Database) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS casino_game_stats (
        discord_id TEXT NOT NULL,
        game TEXT NOT NULL,
        stat_type TEXT NOT NULL,
        stat_key TEXT NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        
        PRIMARY KEY (
          game,
          discord_id,
          stat_type,
          stat_key
        ),

        FOREIGN KEY (
          discord_id
        )
        REFERENCES users (discord_id) ON DELETE CASCADE
      );
    `);
  },
};
