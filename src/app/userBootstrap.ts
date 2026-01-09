import { logger } from '../shared/logger.ts';
import { ensuredUsers } from '../cache/ensuredUsers.ts';

import { UserService } from '../services/user/userService.ts';
import { RouletteService } from '../services/casino/roulette/rouletteService.ts';

import type { UserContext } from '../types/UserContext.ts';

const userService = new UserService();
const rouletteService = new RouletteService();

export function userBootstrap(user: UserContext) {
  try {
    if (!user.username) return;

    if (ensuredUsers.has(user.id)) return;
    
    const created = userService.ensureUserCreated(user);
    ensuredUsers.add(user.id);

    logger.info(`[${user.username}] User [${user.username}] added to cache`);

    if (!created) return;
  } catch (error) {
    logger.error(`[${user.username}] User Bootstrap failed with `, error);
  }
}
