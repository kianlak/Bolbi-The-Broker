import { USER_QUERIES } from "./queries.ts";
import { BEG_COOLDOWN_MS } from "../../../data/constants/constants.ts";

import { getDb } from "../../../database/sqlite.ts";

export class UserService {
  ensureUser(discordId: string) {
    const db = getDb();

    const result = db.prepare(USER_QUERIES.ensureUser).run(discordId);

    return result.changes === 1;
  }

  canBeg(discordId: string): { allowed: boolean; remainingMs: number } {
    const db = getDb();

    const row = db
      .prepare(USER_QUERIES.getLastBegAtByDiscordId)
      .get(discordId) as { last_beg_at: number | null } | undefined;

    if (!row?.last_beg_at) return { allowed: true, remainingMs: 0 };

    const now = Date.now();
    const timeSinceLastBeg = now - row.last_beg_at;

    const remainingMs = BEG_COOLDOWN_MS - timeSinceLastBeg;

    return remainingMs <= 0
      ? { allowed: true, remainingMs: 0 }
      : { allowed: false, remainingMs: remainingMs };
  }

  recordBeg(discordId: string) {
    const db = getDb();

    db.prepare(USER_QUERIES.recordBeg).run(Date.now(), discordId);
  }

  incrementNumberOfBegs(discordId: string) {
    const db = getDb();

    db.prepare(USER_QUERIES.incrementNumberOfBegs).run(discordId);
  }

  incrementBegProfit(discordId: string, amount: number) {
    const db = getDb();

    db.prepare(USER_QUERIES.incrementBegProfit).run(amount, discordId);
  }

  addBalehBucks(discordId: string, amount: number) {
    const db = getDb();

    db.prepare(USER_QUERIES.addBalehBucks).run(amount, discordId);
  }

  subtractBalehBucks(discordId: string, amount: number) {
    const db = getDb();

    db.prepare(USER_QUERIES.addBalehBucks).run(-amount, discordId);
  }

  getBalanceByDiscordId(discordId: string): number {
    const db = getDb();

    const row = db
      .prepare(USER_QUERIES.getBalehBucksByDiscordId)
      .get(discordId) as { baleh_bucks: number } | undefined;

    return row?.baleh_bucks ?? 0;
  }

  getUserByDiscordId(discordId: string) {
    const db = getDb();

    const row = db.prepare(USER_QUERIES.getUserByDiscordId).get(discordId) as {
      discord_id: string;
      baleh_bucks: number;
      last_beg_at: number | null;
      number_of_begs: number;
      beg_profit: number;
    };

    return row;
  }
}
