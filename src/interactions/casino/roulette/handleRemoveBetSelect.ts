import { StringSelectMenuInteraction } from 'discord.js';

import { getOrCreateSession } from './rouletteSession.ts';
import { showRouletteDashboard } from './showRouletteDashboard.ts';

export async function handleRemoveBetSelect(
  interaction: StringSelectMenuInteraction
): Promise<void> {
  const [, , ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const index = Number(interaction.values[0]);
  const session = getOrCreateSession(ownerId);

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= session.bets.length
  ) {
    await interaction.reply({
      content: '❌ Invalid bet selection.',
      ephemeral: true,
    });
    return;
  }

  session.bets.splice(index, 1);

  await showRouletteDashboard(interaction);
}
