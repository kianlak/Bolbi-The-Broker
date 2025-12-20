import { RouletteStatsService } from "../../helper/services/CasinoService/RouletteStatsService/rouletteService.ts";
import { UserService } from "../../helper/services/UserService/userService.ts";
import { renderMainProfileEmbed } from "./data/renderMainProfileEmbed.ts";
import { renderRouletteProfileEmbed } from "./data/renderRouletteProfileEmbed.ts";
import type { ProfileContext } from "./types/ProfileContext.ts";
import type { ProfilePage } from "./types/ProfilePage.ts";
import type { RouletteStats } from "./types/RouletteStats.ts";


const userService = new UserService();
const rouletteStatsService = new RouletteStatsService();

export async function renderProfilePage(
  page: ProfilePage,
  ctx: ProfileContext
) {
  switch (page) {
    case 'roulette': {
      const stats = rouletteStatsService.getFullStatsByDiscordId(ctx.userId);

      if (!stats) {
        // user has never played roulette
        return renderRouletteProfileEmbed(
          ctx,
          createEmptyRouletteStats()
        );
      }

      return renderRouletteProfileEmbed(ctx, stats);
    }

    case 'main':
    default: {
      const user = userService.getUserByDiscordId(ctx.userId);
      return renderMainProfileEmbed(ctx, user);
    }
  }
}

export function createEmptyRouletteStats(): RouletteStats {
  return {
    spins_played: 0,
    baleh_bucks_won: 0,
    baleh_bucks_lost: 0,
    largest_win: 0,
    largest_loss: 0,
    bets_won: 0,
    bets_lost: 0,

    wins_by_target: {},
    losses_by_target: {},

    result_number_wins: {},
  };
}


