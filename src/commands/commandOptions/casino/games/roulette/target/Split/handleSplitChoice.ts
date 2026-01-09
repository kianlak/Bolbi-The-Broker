import {
  ButtonInteraction,
  MessageFlags,
} from 'discord.js';
import { getSession } from '../../../../session/sessionManager.ts';
import { showBetAmountModal } from '../../ui/showBetAmountModal.ts';
import { RouletteBetCategory } from '../../types/RouletteBetCategory.ts';


export async function handleSplitChoice(
  interaction: ButtonInteraction
) {
  const [, , , ownerId, sessionId, base, other] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ **Not your roulette session**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.reply({
      content: '❌ **Session expired**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const a = Number(base);
  const b = Number(other);
  const selection = a < b ? `${a}-${b}` : `${b}-${a}`;

  await showBetAmountModal(
    interaction,
    `casino:roulette:set-amount:${ownerId}:${sessionId}:${RouletteBetCategory.SPLIT}:${selection}`
  );
}
