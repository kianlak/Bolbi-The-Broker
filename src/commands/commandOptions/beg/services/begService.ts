import { logger } from "../../../../shared/logger.ts";

import { getDb } from "../../../../database/sqlite.ts";
import { UserService } from "../../../../services/user/userService.ts";

import type { UserContext } from "../../../../types/UserContext.ts";

export class BegService {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService ?? new UserService();
  }

  begProfileUpdate(user: UserContext, reward: number): void {
    const discordUsername = user.username;
    const discordId = user.id;
    const functionName = this.begProfileUpdate.name;

    logger.info(`[${discordUsername}] Attempting multi transaction query (${functionName})`);
    
    const db = getDb();
    try {
      const transactionsToExecute = db.transaction(() => {
        this.userService.addBalehBucks(discordId, reward);
        this.userService.recordBeg(discordId);
        this.userService.incrementNumberOfBegs(discordId);
        this.userService.incrementBegProfit(discordId, reward);
      });

      transactionsToExecute();
    } catch(error) {
      logger.error(`[${discordUsername}] Multi transaction query failed (${functionName})`);
    }
  }
}
