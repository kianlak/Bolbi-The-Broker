import { logger } from "../../shared/logger.ts";

import { getDb } from "../../database/sqlite.ts";

export class UserService {
  ensureUser(discordId: string) {
    const db = getDb();

    db.prepare(`
      INSERT INTO users (discord_id)
      VALUES (?)
      ON CONFLICT(discord_id) DO NOTHING;
    `).run(discordId);
  }

  getUser(discordId: string) {
    const db = getDb();

    return db.prepare(`
      SELECT id, discord_id, baleh_bucks
      FROM users
      WHERE discord_id = ?;
    `).get(discordId);
  }
}
