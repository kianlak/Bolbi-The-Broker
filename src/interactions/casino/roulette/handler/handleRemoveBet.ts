import { ButtonInteraction } from 'discord.js';

import { getOrCreateSession } from '../rouletteSession.ts';
import { buildRemoveBetMenu } from '../data/buildSelectRemoveBetMenu.ts';

export async function handleRemoveBet(
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

  const session = getOrCreateSession(ownerId);

  if (session.bets.length === 0) {
    await interaction.reply({
      content: '❌ You have no bets to remove.',
      ephemeral: true,
    });
    return;
  }

  await interaction.update({
    content: '🗑 Select a bet to remove:',
    embeds: [],
    components: [buildRemoveBetMenu(session, ownerId)],
  });
}
