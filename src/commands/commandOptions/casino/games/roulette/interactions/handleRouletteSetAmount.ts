import { ModalSubmitInteraction, MessageFlags } from 'discord.js';

import { buildCurrentBetsEmbed } from '../ui/buildCurrentBetsEmbed.ts';
import { getSession, setActiveMessageId } from '../../../session/sessionManager.ts';
import { addOrStackRouletteBet, getRouletteState } from '../rouletteSessionStore.ts';
import { buildRouletteBetCategoryMenu } from '../ui/buildRouletteBetCategoryMenu.ts';
import { safeDeleteMessage } from '../../../helper/safeDeleteMessage.ts';

import type { RouletteBetCategory } from '../types/RouletteBetCategory.ts';


export async function handleRouletteSetAmount(
  interaction: ModalSubmitInteraction
) {
  await interaction.deferReply();

  const [, , , ownerId, sessionId, category, selection] =
    interaction.customId.split(':');

  const betCategory = category as RouletteBetCategory;

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.reply({
      content: '❌ This roulette session is no longer active.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const amount = Number(
    interaction.fields.getTextInputValue('amount')
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    await interaction.reply({
      content: '❌ Please enter a valid positive number.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  addOrStackRouletteBet(sessionId, {
    category: betCategory,
    selection,
    amount,
  });

  const state = getRouletteState(sessionId);
  const previousMessageId = session.activeMessageId;

  const reply = await interaction.editReply({
    embeds: [buildCurrentBetsEmbed(state.bets)],
    components: [
      buildRouletteBetCategoryMenu(ownerId, sessionId),
    ],
  });

  setActiveMessageId(ownerId, reply.id);
  await safeDeleteMessage(interaction.channel!, previousMessageId);
}
