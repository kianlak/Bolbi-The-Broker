import { logger } from "../../../shared/logger.ts";

import { UserService } from "../../../services/user/userService.ts";
import { RouletteService } from "../../../services/casino/roulette/rouletteService.ts";
import { buildMainProfileEmbed } from "./ui/buildMainProfileEmbed.ts";
import { buildRouletteStatsProfileEmbed } from "./ui/buildRouletteStatsProfileEmbed.ts";

import type { ProfileContext } from "./types/ProfileContext.ts";
import type { ProfilePage } from "./types/ProfilePage.ts";
import type { MainProfileStats } from "./types/MainProfileStats.ts";
import type { UserContext } from "../../../types/UserContext.ts";
import type { RouletteProfileStats } from "./types/RouletteProfileStats.ts";
import type { RouletteBetWinRates } from "./types/RouletteBetWinRates.ts";

const userService = new UserService();
const rouletteService = new RouletteService();

export async function profileRenderRouter(
  page: ProfilePage,
  profileContext: ProfileContext,
  viewer: UserContext,
) {
  try {
    switch (page) {
      case 'main': {
        const userStats: MainProfileStats = userService.getUser(profileContext.user.id);

        if (!userStats) return null;

        logger.info(`[${viewer.username}] User has selected to view [${profileContext.user.username}] main profile`);        

        return buildMainProfileEmbed(profileContext, userStats);
      }

      case 'roulette': {
        const rouletteStats: RouletteProfileStats | null = rouletteService.getStats(profileContext.user.id);
        const rouletteBetWinRates: RouletteBetWinRates | null = rouletteService.getBetTypeWinRates(profileContext.user.id);

        if (!rouletteStats) return null;

        logger.info(`[${viewer.username}] User has selected to view [${profileContext.user.username}] roulette stats`);        

        return buildRouletteStatsProfileEmbed(profileContext, rouletteStats, rouletteBetWinRates);
      }

      default:
        throw new Error(`Unknown profile page: (${page})`);
    }
  } catch(error) {
    throw error;
  }
}
