import {
  ButtonInteraction,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  MessageFlags,
} from 'discord.js';

import { getSession } from '../../../session/sessionManager.ts';
import { getRouletteState } from '../rouletteSessionStore.ts';
import { formatRouletteBetLabel } from '../helper/formatRouletteBetsLabel.ts';

export async function handleRouletteRemoveBet(
  interaction: ButtonInteraction
) {
  const [, , , ownerId, sessionId] = interaction.customId.split(':');

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

  const state = getRouletteState(sessionId);

  if (state.bets.length === 0) {
    await interaction.reply({
      content: '❌ **You have no bets to remove**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const menu = new StringSelectMenuBuilder()
    .setCustomId(
      `casino:roulette:remove-bet-select:${ownerId}:${sessionId}`
    )
    .setPlaceholder('Select a bet to remove')
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions(
      state.bets.map((bet, index) => ({
        label: `${index + 1}. ${formatRouletteBetLabel(bet)}`,
        description: `$${bet.amount}`,
        value: String(index),
      }))
    );

  await interaction.reply({
    components: [
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu),
    ],
    flags: MessageFlags.Ephemeral,
  });
}
