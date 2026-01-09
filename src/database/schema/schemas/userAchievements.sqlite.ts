import type Database from 'better-sqlite3';

import type { DatabaseSchema } from '../../types/DatabaseSchema.ts';

export const userAchievements: DatabaseSchema = {
  name: 'roulette_spin_stats',
  ensure(db: Database.Database) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        discord_id TEXT NOT NULL,
        achievement_id TEXT NOT NULL,
        tier INTEGER NOT NULL,
        PRIMARY KEY (discord_id, achievement_id)
      );`
    );
  },
};
