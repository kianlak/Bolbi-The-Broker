import { ButtonInteraction } from 'discord.js';

import { deleteSession } from '../rouletteSession.ts';

export async function handleExit(
  interaction: ButtonInteraction
): Promise<void> {
  const [, , ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  deleteSession(ownerId);

  await interaction.update({
    components: [],
  });
}
