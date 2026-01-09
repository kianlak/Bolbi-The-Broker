import { ModalSubmitInteraction, MessageFlags, AttachmentBuilder } from 'discord.js';

import { logger } from '../../../../../../shared/logger.ts';

import { buildCurrentBetsEmbed } from '../ui/buildCurrentBetsEmbed.ts';
import { getSession, setActiveMessageId } from '../../../session/sessionManager.ts';
import { addOrStackRouletteBet, getRouletteState } from '../rouletteSessionStore.ts';
import { buildRouletteBetCategoryMenu } from '../ui/buildRouletteBetCategoryMenu.ts';
import { safeDeleteMessage } from '../../../helper/safeDeleteMessage.ts';
import { buildRouletteActionRow } from '../ui/buildRouletteButtonRows.ts';

import type { RouletteBetCategory } from '../types/RouletteBetCategory.ts';


export async function handleRouletteSetAmount(
  interaction: ModalSubmitInteraction
) {
  await interaction.deferReply();

  const [, , , ownerId, sessionId, category, selection] = interaction.customId.split(':');

  const betCategory = category as RouletteBetCategory;
  const rouletteImage = new AttachmentBuilder('./src/data/img/rouletteTable.png');
  
  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.editReply({
      content: '❌ **This roulette session is no longer active**',
    });
    return;
  }

  const amount = Number(interaction.fields.getTextInputValue('amount'));

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.editReply({
      content: '❌ **Please enter a valid positive number**',

    });

    logger.warn(`[${interaction.user.username}] User did not enter a valid positive number`);

    return;
  }

  addOrStackRouletteBet(sessionId, {
    category: betCategory,
    selection,
    amount,
  });

  logger.info(`[${interaction.user.username}] User selected bet ${betCategory}:${selection} for ${amount} baleh bucks\n`);

  const state = getRouletteState(sessionId);
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

  setActiveMessageId(ownerId, reply.id);
  await safeDeleteMessage(interaction.channel!, interaction.user.username, previousMessageId);
}
