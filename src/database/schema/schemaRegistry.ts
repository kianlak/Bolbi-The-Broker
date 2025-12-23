import type { DatabaseSchema } from '../types/DatabaseSchema.ts';

import { usersSchema } from './schemas/users.sqlite.ts';
import { casinoGameStatsSchema } from './schemas/casino_game_stats.sqlite.ts';
import { rouletteStatsSchema } from './schemas/roulette_stats.sqlite.ts';

export const schemaRegistry: DatabaseSchema[] = [
  usersSchema,
  casinoGameStatsSchema,
  rouletteStatsSchema,
];
