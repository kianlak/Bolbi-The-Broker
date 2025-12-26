import { USER_QUERIES } from './queries.ts';

import { getDb } from '../../database/sqlite.ts';

import type { balehBucksUpdate } from './types/balehBucksUpdate.ts';

export type UserRow = {
  discord_id: string;
  baleh_bucks: number;
  last_beg_at: number | null;
  number_of_begs: number;
  beg_profit: number;
};

export class UserRepository {
  ensureUser(discordId: string): boolean {
    const db = getDb();

    const result = db
      .prepare(USER_QUERIES.ensureUser)
      .run(discordId);
    
    return result.changes === 1;
  }

  getLastBegAtByDiscordId(discordId: string): number | null {
    const db = getDb();

    const row = db
      .prepare(USER_QUERIES.getLastBegAtByDiscordId)
      .get(discordId) as { last_beg_at: number } | undefined;

    return row ? row.last_beg_at : null;
  }

  updateBalehBucksByDiscordId(discordId: string, amount: number, type: balehBucksUpdate): void {
    const db = getDb();
    
    if (type === 'ADD') db.prepare(USER_QUERIES.addBalehBucksByDiscordId).run(amount, discordId);
    else if (type === 'SUBTRACT') console.log(); // Placeholder until I write a subtract query
  }

  updateLastBegAtByDiscordId(discordId: string, timestamp: number): void {
    const db = getDb();

    db.prepare(USER_QUERIES.updateLastBegAtByDiscordId).run(timestamp, discordId);
  }

  incrementNumberOfBegsByDiscordId(discordId: string): void {
    const db = getDb();

    db.prepare(USER_QUERIES.incrementNumberOfBegsByDiscordId).run(discordId);
  }

  incrementBegProfitByDiscordId(discordId: string, amount: number): void {
    const db = getDb();

    db.prepare(USER_QUERIES.incrementBegProfitByDiscordId).run(amount, discordId);
  }
}
