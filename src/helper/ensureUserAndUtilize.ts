import { RouletteStatsService } from "./services/CasinoService/RouletteStatsService/rouletteService.ts";
import { UserService } from "./services/UserService/userService.ts";

export function ensureUserAndInitialize(discordId: string) {
  const userService = new UserService();
  const rouletteStatsService = new RouletteStatsService();

  const isNewUser = userService.ensureUser(discordId);

  // if (!isNewUser) return;

  rouletteStatsService.ensureRouletteStat(discordId);
}