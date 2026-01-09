import type { Interaction, InteractionResponse } from 'discord.js';

import { profileInteractionRouter } from '../commands/commandOptions/profile/interactions/profileInteractionRouter.ts';
import { casinoInteractionRouter } from '../commands/commandOptions/casino/interactions/casinoInteractionRouter.ts';

const DOMAIN_ROUTERS: Record<
  string,
  (interaction: Interaction) => Promise<void | InteractionResponse<boolean>>
> = {
  profile: profileInteractionRouter,
  casino: casinoInteractionRouter,
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
