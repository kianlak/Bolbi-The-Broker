import type { Interaction } from 'discord.js';

import { casinoInteractionRouter } from './casino/casinoRouter.ts';
import { rouletteInteractionRouter } from './casino/roulette/rouletteRouter.ts';
import { profileInteractionRouter } from '../commands/commandOptions/profile/interactions/profileInteractionRouter.ts';

const DOMAIN_ROUTERS: Record<
  string,
  (interaction: Interaction) => Promise<void>
> = {
  profile: profileInteractionRouter,
  casino: casinoInteractionRouter,
  roulette: rouletteInteractionRouter,
};

export async function interactionRouter(interaction: Interaction) {
  if (
    !interaction.isButton() &&
    !interaction.isStringSelectMenu() &&
    !interaction.isModalSubmit()
  ) {
    return;
  }

  const [domain] = interaction.customId.split(':');
  const router = DOMAIN_ROUTERS[domain];

  if (!router) return;

  await router(interaction);
}
