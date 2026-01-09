import { getDb } from '../../database/sqlite.ts';

import { ACHIEVEMENT_QUERIES } from './queries.ts';

export class AchievementRepository {
  getTier(discordId: string, achievementId: string): number {
    const db = getDb();

    const row = db
      .prepare(ACHIEVEMENT_QUERIES.getTier)
      .get(discordId, achievementId) as { tier: number } | undefined;

    return row?.tier ?? 0;
  }

  setTier(
    discordId: string,
    achievementId: string,
    tier: number
  ): void {
    const db = getDb();

    db.prepare(ACHIEVEMENT_QUERIES.setTier)
      .run(discordId, achievementId, tier);
  }
}
