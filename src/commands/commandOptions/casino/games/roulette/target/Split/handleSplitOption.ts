import { ButtonInteraction, MessageFlags } from 'discord.js';

import { getSession } from '../../../../session/sessionManager.ts';
import { showSplitAmountModal } from './ui/showSplitAmountModal.ts';

export async function handleSplitOption(
  interaction: ButtonInteraction
) {
  const [, , , ownerId, sessionId, base, option] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ **Not your session**',
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

  await showSplitAmountModal(
    interaction,
    ownerId,
    sessionId,
    base,
    option
  );
}
