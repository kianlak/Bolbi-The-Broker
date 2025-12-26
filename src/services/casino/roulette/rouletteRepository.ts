import { ROULETTE_STATS_QUERIES } from './queries.ts';

import { getDb } from '../../../database/sqlite.ts';

export class RouletteStatsRepository {
  ensureStats(discordId: string): boolean {
    const db = getDb();

    const result = db
      .prepare(ROULETTE_STATS_QUERIES.createUserRouletteStats)
      .run(discordId);

    return result.changes === 1;
  }
}
