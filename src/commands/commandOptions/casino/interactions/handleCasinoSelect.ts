import {
  MessageFlags,
  StringSelectMenuInteraction,
} from 'discord.js';

import { logger } from '../../../../shared/logger.ts';

import { CASINO_GAME_REGISTRY } from '../constants/CASINO_GAME_REGISTRY.ts';
import { getSession, setActiveMessageId, setGame } from '../session/sessionManager.ts';

export async function handleCasinoSelect(interaction: StringSelectMenuInteraction) {
  const [, , , ownerId, sessionId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ **This casino menu is not yours**',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const session = getSession(ownerId);

  if (!session || session.sessionId !== sessionId) {
    await interaction.reply({
      content: '❌ **This casino session is no longer active**',
      flags: MessageFlags.Ephemeral,
    });

    logger.warn(`[${interaction.user.username}] Roulette session does not exist anymore`);

    return;
  }

  if (session.game !== null) {
    await interaction.reply({
      content: '❌ **Exit your current table first**',
      flags: MessageFlags.Ephemeral,
    });

    logger.warn(`[${interaction.user.username}] User already has an active casino game session`);

    return;
  }

  const selectedGame = interaction.values[0];
  const handler = CASINO_GAME_REGISTRY[selectedGame];

  logger.info(`[${interaction.user.username}] User has selected to play "${selectedGame}"`);

  setGame(ownerId, selectedGame);
  setActiveMessageId(ownerId, interaction.message.id);
  await handler(interaction);
}
