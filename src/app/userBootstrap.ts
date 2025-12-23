import { logger } from "../shared/logger.ts";

import { RouletteStatsService } from "../services/casino/roulette/rouletteService.ts";
import { UserService } from "../services/user/userService.ts";

const userService = new UserService();
const rouletteStatsService = new RouletteStatsService();

export function userBootstrap(discordId: string) {
  logger.info('Starting user Bootstrap');
  
  const created = userService.ensureUserCreated(discordId);

  if (!created) return;

  rouletteStatsService.createUserRouletteStats(discordId);
}
