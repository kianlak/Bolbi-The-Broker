import { AttachmentBuilder, MessageFlags, ModalSubmitInteraction } from 'discord.js';

import { logger } from '../../../../../../../shared/logger.ts';

import { getSession } from '../../../../session/sessionManager.ts';
import { addOrStackRouletteBet, getRouletteState } from '../../rouletteSessionStore.ts';
import { buildCurrentBetsEmbed } from '../../ui/buildCurrentBetsEmbed.ts';
import { buildRouletteBetCategoryMenu } from '../../ui/buildRouletteBetCategoryMenu.ts';
import { safeDeleteMessage } from '../../../../helper/safeDeleteMessage.ts';
import { UserService } from '../../../../../../../services/user/userService.ts';
import { buildRouletteActionRow } from '../../ui/buildRouletteButtonRows.ts';

export async function handleRouletteSetNumberAmount(interaction: ModalSubmitInteraction) {
  await interaction.deferReply();

  const [, , , ownerId, sessionId] = interaction.customId.split(':');
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');
  const userService = new UserService();

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply({
      content: '❌ **Session expired**',
    });
    return;
  }

  const rawNumber = interaction.fields
    .getTextInputValue('number')
    .trim();

  if (rawNumber !== '0' && rawNumber !== '00' &&
    !/^(?:[1-9]|[12][0-9]|3[0-6])$/.test(rawNumber)
  ) {
    await interaction.editReply({
      content: '❌ **Enter a valid number (0, 00, or 1-36)**',
    });
    return;
  }

  let normalizedNumber: number;

  if (rawNumber === '00') normalizedNumber = 37;
  else normalizedNumber = Number(rawNumber);

  const selection = rawNumber;

  const amount = Number(
    interaction.fields.getTextInputValue('amount')
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.editReply({
      content: '❌ **Enter a valid bet amount**',
    });
    return;
  }

  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;

  if (amount > available) {
    await interaction.editReply({
      content: `❌ **You only have ${available} baleh bucks available**`,
    });
    return;
  }

  addOrStackRouletteBet(sessionId, {
    category: 'NUMBER',
    selection,
    amount,
  });

  logger.info(`[${interaction.user.username}] User selected bet ${'NUMBER'}:${selection} for ${amount} baleh bucks\n`)
  
  const previousMessageId = session.activeMessageId;

  const reply = await interaction.editReply({
    embeds: [buildCurrentBetsEmbed(state.bets, {
      username: interaction.user.username,
      avatarUrl: interaction.user.displayAvatarURL(),
    })],
    components: [
      buildRouletteBetCategoryMenu(ownerId, interaction.user.username, sessionId),
      buildRouletteActionRow(ownerId, sessionId, {
        disableSpin: state.bets.length === 0,
        disableRemove: state.bets.length === 0,
      }),
    ],
    files: [rouletteImage],
  });

  session.activeMessageId = reply.id;

  await safeDeleteMessage(interaction.channel, interaction.user.username, previousMessageId);
}