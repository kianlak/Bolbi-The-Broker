import { MessageComponentInteraction } from 'discord.js';

import { handleCasinoSelect } from './casinoSelect.ts';
import { handleRouletteSpin } from './roulette.ts';

export async function casinoInteractionRouter(interaction: MessageComponentInteraction) {
  const [, action] = interaction.customId.split(':');

  if (interaction.isStringSelectMenu()) {
    if (action === 'select') {
      return handleCasinoSelect(interaction);
    }
  }

  if (interaction.isButton()) {
    if (action === 'roulette') {
      return handleRouletteSpin(interaction);
    }
  }
}
