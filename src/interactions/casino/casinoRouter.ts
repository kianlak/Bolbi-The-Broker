import type { Interaction } from 'discord.js';
import { handleCasinoSelect } from './handleCasinoSelect.ts';

export async function casinoInteractionRouter(interaction: Interaction) {
  if (!interaction.isMessageComponent()) return;

  const [, action, ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This casino menu isn\'t yours',
      ephemeral: true,
    });
    return;
  }

  switch (action) {
    case 'select':
      if (!interaction.isStringSelectMenu()) return;
      return handleCasinoSelect(interaction);
  }
}
