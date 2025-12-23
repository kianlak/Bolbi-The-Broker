import { ButtonInteraction } from 'discord.js';
import { buildWagerAmountModal } from '../data/buildWagerAmount.ts';

export async function handleSplitSecondSelect(
  interaction: ButtonInteraction
) {
  const [, , firstRaw, secondRaw, ownerId] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const first = Number(firstRaw);
  const second = Number(secondRaw);

  const target = `S_${Math.min(first, second)}_${Math.max(first, second)}`;

  await interaction.showModal(
    buildWagerAmountModal(ownerId, 'SPLIT', target)
  );
}
