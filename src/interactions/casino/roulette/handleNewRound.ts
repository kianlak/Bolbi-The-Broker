import { ButtonInteraction } from 'discord.js';

import { showRouletteDashboard } from './showRouletteDashboard.ts';
import { getOrCreateSession } from './rouletteSession.ts';

export async function handleNewRound(
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

  // Ensure clean round
  session.bets.length = 0;

  await showRouletteDashboard(interaction);
}
