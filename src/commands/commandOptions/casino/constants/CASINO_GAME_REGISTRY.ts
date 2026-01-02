import type { StringSelectMenuInteraction } from 'discord.js';

import { rouletteWelcomeHandler } from '../games/roulette/rouletteWelcomeHandler.ts';

import type { CasinoGameType } from '../types/CasinoGameType.ts';

export const CASINO_GAME_REGISTRY: Record<
  CasinoGameType,
  (interaction: StringSelectMenuInteraction) => Promise<void>
> = {
  roulette: rouletteWelcomeHandler,
};
