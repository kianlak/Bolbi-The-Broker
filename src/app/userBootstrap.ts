import { RouletteStatsService } from '../services/casino/roulette/rouletteService.ts';
import { UserService } from '../services/user/userService.ts';

import type { UserContext } from '../types/UserContext.ts';

const userService = new UserService();
const rouletteStatsService = new RouletteStatsService();

export function userBootstrap(user: UserContext) {
  if (!user.username) return;

  const created = userService.ensureUserCreated(user);
  
  if (!created) return;

  rouletteStatsService.ensureRouletteStatsCreated(user);
}
