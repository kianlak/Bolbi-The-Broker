import {
  StringSelectMenuInteraction,
  MessageFlags,
  AttachmentBuilder,
} from 'discord.js';

import { getSession } from '../../../session/sessionManager.ts';
import { getRouletteState } from '../rouletteSessionStore.ts';
import { buildCurrentBetsEmbed } from '../ui/buildCurrentBetsEmbed.ts';
import { buildRouletteBetCategoryMenu } from '../ui/buildRouletteBetCategoryMenu.ts';
import { safeDeleteMessage } from '../../../helper/safeDeleteMessage.ts';
import { buildRouletteActionRow } from '../ui/buildRouletteButtonRows.ts';
import { logger } from '../../../../../../shared/logger.ts';

export async function handleRouletteRemoveBetSelect(
  interaction: StringSelectMenuInteraction
) {
  await interaction.deferReply();
  
  const [, , , ownerId, sessionId] = interaction.customId.split(':');
  
  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply({
      content: '❌ **Session expired**',
    });
    return;
  }
  
  const index = Number(interaction.values[0]);
  const state = getRouletteState(sessionId);
  
  if (!Number.isInteger(index) || !state.bets[index]) {
    await interaction.editReply({
      content: '❌ **Invalid bet selection**',
    });
    return;
  }
  
  const previousMessageId = session.activeMessageId;
  
  
  const bet = state.bets[index];
  if (!bet) {
    await interaction.editReply('❌ **Invalid bet selection**');
    return;
  }
  
  state.reserved -= bet.amount;
  state.bets.splice(index, 1);
  
  logger.info(`[${interaction.user.username}] User requested to remove bet ${bet.category}:${bet.selection}\n`);

  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');
  
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

  await safeDeleteMessage(
    interaction.channel,
    interaction.user.username,
    previousMessageId
  );
}
