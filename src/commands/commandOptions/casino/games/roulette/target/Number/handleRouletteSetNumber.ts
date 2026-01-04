import { ModalSubmitInteraction } from 'discord.js';

import { getSession } from '../../../../session/sessionManager.ts';
import {
  addOrStackRouletteBet,
  getRouletteState,
} from '../../rouletteSessionStore.ts';

import { buildCurrentBetsEmbed } from '../../ui/buildCurrentBetsEmbed.ts';
import { buildRouletteBetCategoryMenu } from '../../ui/buildRouletteBetCategoryMenu.ts';
import { safeDeleteMessage } from '../../../../helper/safeDeleteMessage.ts';

export async function handleRouletteSetNumberAmount(
  interaction: ModalSubmitInteraction
) {
  await interaction.deferReply();

  const [, , , ownerId, sessionId] =
    interaction.customId.split(':');

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply({
      content: '❌ Session expired.',
    });
    return;
  }

  const rawNumber = interaction.fields
    .getTextInputValue('number')
    .trim();

  const isDoubleZero = rawNumber === '00';
  const numberValue = Number(rawNumber);

  if (
    (!isDoubleZero && !Number.isInteger(numberValue)) ||
    numberValue < 0 ||
    numberValue > 36
  ) {
    await interaction.editReply({
      content: '❌ Enter a valid number (0–36 or 00).',
    });
    return;
  }

  const selection = isDoubleZero
    ? '00'
    : String(numberValue);

  const amount = Number(
    interaction.fields.getTextInputValue('amount')
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.editReply({
      content: '❌ Enter a valid bet amount.',
    });
    return;
  }

  addOrStackRouletteBet(sessionId, {
    category: 'NUMBER',
    selection,
    amount,
  });

  const state = getRouletteState(sessionId);
  const previousMessageId = session.activeMessageId;

  const reply = await interaction.editReply({
    embeds: [buildCurrentBetsEmbed(state.bets, interaction)],
    components: [
      buildRouletteBetCategoryMenu(ownerId, sessionId),
    ],
  });

  session.activeMessageId = reply.id;

  await safeDeleteMessage(interaction.channel, interaction.user.username, previousMessageId);
}