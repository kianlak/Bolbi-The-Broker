import type { Interaction } from 'discord.js';
import { casinoInteractionRouter } from './casino/casinoRouter.ts';

export async function interactionRouter(interaction: Interaction) {
  if (!interaction.isMessageComponent()) return;

  const [interactionDomain] = interaction.customId.split(':');

  switch (interactionDomain) {
    case 'casino':
      return casinoInteractionRouter(interaction);

    default:
      return;
  }
}