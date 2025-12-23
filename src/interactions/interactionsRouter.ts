import type { Interaction } from 'discord.js';
import { casinoInteractionRouter } from './casino/casinoRouter.ts';
import { rouletteInteractionRouter } from './casino/roulette/rouletteRouter.ts';

const DOMAIN_ROUTERS: Record<string, (interaction: Interaction) => Promise<void>> = {
  casino: casinoInteractionRouter,
  roulette: rouletteInteractionRouter,
};

export async function interactionRouter(interaction: Interaction) {
  if (!('customId' in interaction)) return;

  const [domain] = interaction.customId.split(':');
  const router = DOMAIN_ROUTERS[domain];

  
  if (!router) return;

  await router(interaction);
}
