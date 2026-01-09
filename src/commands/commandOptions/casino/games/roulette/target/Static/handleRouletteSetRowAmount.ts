import {
  ModalSubmitInteraction,
  AttachmentBuilder,
} from 'discord.js';

import { getSession } from '../../../../session/sessionManager.ts';
import { UserService } from '../../../../../../../services/user/userService.ts';
import { addOrStackRouletteBet, getRouletteState } from '../../rouletteSessionStore.ts';
import { buildCurrentBetsEmbed } from '../../ui/buildCurrentBetsEmbed.ts';
import { buildRouletteBetCategoryMenu } from '../../ui/buildRouletteBetCategoryMenu.ts';
import { buildRouletteActionRow } from '../../ui/buildRouletteButtonRows.ts';
import { safeDeleteMessage } from '../../../../helper/safeDeleteMessage.ts';
import { RouletteBetCategory } from '../../types/RouletteBetCategory.ts';
import { logger } from '../../../../../../../shared/logger.ts';

export async function handleRouletteSetRowAmount(
  interaction: ModalSubmitInteraction
) {
  await interaction.deferReply();

  const [, , , categoryRaw, ownerId, sessionId] = interaction.customId.split(':');
  const category = categoryRaw as RouletteBetCategory;

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply({ content: '❌ **Session expired**' });
    return;
  }

  const amount = Number(
    interaction.fields.getTextInputValue('amount')
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.editReply({
      content: '❌ **Enter a valid bet amount**',
    });
    return;
  }

  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);
  const available = balance - state.reserved;

  if (amount > available) {
    await interaction.editReply({
      content: `❌ **You only have $${available} available**`,
    });
    return;
  }

  const previousMessageId = session.activeMessageId;

  addOrStackRouletteBet(sessionId, {
    category,
    selection: 'STATIC',
    amount,
  });

  const rouletteImage = new AttachmentBuilder(
    './src/data/img/rouletteTable.png'
  );

  logger.info(`[${interaction.user.username}] User selected bet ${category}:${'STATIC'} for ${amount} baleh bucks\n`)

  const reply = await interaction.editReply({
    embeds: [
      buildCurrentBetsEmbed(state.bets, {
        username: interaction.user.username,
        avatarUrl: interaction.user.displayAvatarURL(),
      }),
    ],
    components: [
      buildRouletteBetCategoryMenu(
        ownerId,
        interaction.user.username,
        sessionId
      ),
      buildRouletteActionRow(ownerId, sessionId, {
        disableSpin: state.bets.length === 0,
        disableRemove: state.bets.length === 0,
      }),
    ],
    files: [rouletteImage],
  });

  session.activeMessageId = reply.id;

  await safeDeleteMessage(
    interaction.channel,
    interaction.user.username,
    previousMessageId
  );
}
