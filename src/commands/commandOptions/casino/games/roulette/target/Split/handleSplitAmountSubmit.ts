import { AttachmentBuilder, ModalSubmitInteraction } from 'discord.js';

import { getSession } from '../../../../session/sessionManager.ts';
import { getRouletteState, addOrStackRouletteBet } from '../../rouletteSessionStore.ts';
import { buildCurrentBetsEmbed } from '../../ui/buildCurrentBetsEmbed.ts';
import { buildRouletteBetCategoryMenu } from '../../ui/buildRouletteBetCategoryMenu.ts';
import { UserService } from '../../../../../../../services/user/userService.ts';
import { safeDeleteMessage } from '../../../../helper/safeDeleteMessage.ts';
import { buildRouletteActionRow } from '../../ui/buildRouletteButtonRows.ts';
import { logger } from '../../../../../../../shared/logger.ts';

export async function handleSplitAmountSubmit(
  interaction: ModalSubmitInteraction
) {
  await interaction.deferReply();

  const [, , , ownerId, sessionId, base, option] = interaction.customId.split(':');
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply('❌ Session expired.');
    return;
  }

  const amount = Number(
    interaction.fields.getTextInputValue('amount')
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.editReply('❌ Enter a valid amount.');
    return;
  }

  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;

  if (amount > available) {
    await interaction.editReply(
      `❌ You only have ${available} baleh bucks available.`
    );
    return;
  }

  let betSelectionFormat;
  
  if (Number(option) === 37) betSelectionFormat = `${option}_${base}`;
  else if (Number(base) < Number(option)) betSelectionFormat = `${base}_${option}`;
  else betSelectionFormat = `${option}_${base}`;

  addOrStackRouletteBet(sessionId, {
    category: 'SPLIT',
    selection: betSelectionFormat,
    amount,
  });

  state.reserved += amount;

  logger.info(`[${interaction.user.username}] User selected bet ${'SPLIT'}:${betSelectionFormat} for ${amount} baleh bucks\n`)

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
    files: [rouletteImage]
  });

  session.activeMessageId = reply.id;

  await safeDeleteMessage(
    interaction.channel,
    interaction.user.username,
    previousMessageId
  );
}
