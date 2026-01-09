import { ButtonInteraction } from 'discord.js';
import { showBetAmountModal } from '../ui/showBetAmountModal.ts';

export async function handleRouletteChooseOption(
  interaction: ButtonInteraction
) {
  const [, , , ownerId, sessionId, category, selection] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) return;

  await showBetAmountModal(
    interaction,
    `casino:roulette:set-amount:${ownerId}:${sessionId}:${category}:${selection}`
  );
}
