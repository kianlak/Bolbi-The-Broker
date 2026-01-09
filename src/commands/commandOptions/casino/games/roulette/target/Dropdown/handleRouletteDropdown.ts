import { StringSelectMenuInteraction, MessageFlags } from 'discord.js';

import { getSession } from '../../../../session/sessionManager.ts';
import { UserService } from '../../../../../../../services/user/userService.ts';
import { getRouletteState } from '../../rouletteSessionStore.ts';
import { showRouletteDropdownAmountModal } from './ui/showRouletteDropdownAmountModal.ts';
import { logger } from '../../../../../../../shared/logger.ts';

export async function handleRouletteChooseDropdown(
  interaction: StringSelectMenuInteraction
) {
  const [, , , category, ownerId, sessionId] =
    interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ **Not your menu**',
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

  const selection = interaction.values[0];

  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;
  if (available <= 0) {
    await interaction.reply({
      content: '❌ **You have no available balance**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  await showRouletteDropdownAmountModal(
    interaction,
    `casino:roulette:set-amount:${ownerId}:${sessionId}:${category}:${selection}`,
    available
  );
}
