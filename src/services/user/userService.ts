import { BEG_COOLDOWN_MS } from "../../commands/commandOptions/beg/constants/begConstants.ts";

import { logger } from "../../shared/logger.ts";

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

  subtractBalehBucks(discordId: string, amount: number) {
    this.repo.updateBalehBucksByDiscordId(discordId, amount, 'SUBTRACT');
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

  getUser(discordId: string) {
    return this.repo.getUserByDiscordId(discordId);
  }

  getUserBalance(discordId: string): number {
    return this.repo.getUserBalanceByDiscordId(discordId);
  }
}
