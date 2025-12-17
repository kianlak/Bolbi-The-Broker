import { ButtonInteraction } from 'discord.js';

import { buildWagerAmountModal } from './data/buildWagerAmount.ts';

export async function handleOpenWagerModal(
  interaction: ButtonInteraction
): Promise<void> {
  const [, , category, target, ownerId] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  await interaction.showModal(
    buildWagerAmountModal(ownerId, category, target)
  );

  return;
}
