import { ButtonInteraction } from 'discord.js';
import { buildWagerAmountModal } from './data/buildWagerAmount.ts';

export async function handleTargetSelect(
  interaction: ButtonInteraction
): Promise<void> {
  const [, , category, target, ownerId] =
    interaction.customId.split(':');

  await interaction.showModal(
    buildWagerAmountModal(ownerId, category, target)
  );

  return;
}
