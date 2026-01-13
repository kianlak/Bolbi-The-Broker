import type {
  Interaction,
  StringSelectMenuInteraction,
  InteractionResponse,
} from 'discord.js';

import { binderPackSelectHandler } from './binderPackSelectHandler.ts';

export async function binderInteractionRouter(
  interaction: Interaction
): Promise<void | InteractionResponse<boolean>> {
  if (!interaction.isStringSelectMenu()) return;

  const [domain, action] = interaction.customId.split(':');

  if (domain !== 'binder') return;

  switch (action) {
    case 'pack':
      return binderPackSelectHandler(
        interaction as StringSelectMenuInteraction
      );

    default:
      return;
  }
}
