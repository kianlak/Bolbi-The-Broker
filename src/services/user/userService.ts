import { USER_QUERIES } from "./queries.ts";
import { BEG_COOLDOWN_MS } from "../../commands/commandOptions/beg/constants/begConstants.ts";

import { logger } from "../../shared/logger.ts";

import { getDb } from "../../database/sqlite.ts";
import { UserRepository } from "./userRepository.ts";

import type { UserContext } from "../../types/UserContext.ts";
import type { BegPermission } from "./types/begPermission.ts";

export class UserService {
  private readonly repo: UserRepository;

  constructor(repo?: UserRepository) {
    this.repo = repo ?? new UserRepository();
  }

  ensureUserCreated(user: UserContext): boolean {
    const discordUsername = user.username;
    const discordId = user.id;

    logger.info(`[${discordUsername}] Ensuring: User is created`);
    
    if (!discordId) throw new Error('discordId is required to ensure user');

    return this.repo.ensureUser(discordId);
  }

  canBeg(discordId: string): BegPermission {
    const lastBegAt = this.repo.getLastBegAtByDiscordId(discordId);

    if (!lastBegAt) return { allowed: true, remainingMs: 0 };

    const elapsedMs = Date.now() - lastBegAt;
    const remainingMs = BEG_COOLDOWN_MS - elapsedMs;

    if (remainingMs <= 0) return { allowed: true, remainingMs: 0 };

    return { allowed: false, remainingMs };
  }

  addBalehBucks(discordId: string, amount: number): void {
    this.repo.updateBalehBucksByDiscordId(discordId, amount, 'ADD');
  }

  recordBeg(discordId: string): void {
    this.repo.updateLastBegAtByDiscordId(discordId, Date.now());
  }

  incrementNumberOfBegs(discordId: string) {
    this.repo.incrementNumberOfBegsByDiscordId(discordId);
  }

  incrementBegProfit(discordId: string, amount: number) {
    this.repo.incrementBegProfitByDiscordId(discordId, amount);
  }

  getUserByDiscordId(discordId: string) {
    return this.repo.getUserByDiscordId(discordId);
  }

























  subtractBalehBucks(discordId: string, amount: number) {
    const db = getDb();

    db.prepare(USER_QUERIES.addBalehBucksByDiscordId).run(-amount, discordId);
  }

  getBalanceByDiscordId(discordId: string): number {
    const db = getDb();

    const row = db
      .prepare(USER_QUERIES.getBalehBucksByDiscordId)
      .get(discordId) as { baleh_bucks: number } | undefined;

    return row?.baleh_bucks ?? 0;
  }
}
