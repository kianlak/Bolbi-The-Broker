import { AttachmentBuilder, Message } from 'discord.js';

import { logger } from '../../../shared/logger.ts';

import { buildCasinoEmbed } from './ui/buildCasinoEmbed.ts';
import { buildCasinoGameSelectionMenu } from './ui/buildCasinoGameSelectionMenu.ts';
import { createSession, deleteSession, getSession, setLobbyMessageId } from './session/sessionManager.ts';
import { getMessageChannelName } from '../../../helper/getMessageChannelName.ts';
import { deleteRouletteState } from './games/roulette/rouletteSessionStore.ts';

import type { CommandContext } from '../../types/CommandContext.ts';

export async function casino({ message, user }: CommandContext) {
  const casinoEntranceImage = new AttachmentBuilder('./src/data/img/casinoEntrance.png');
  const existingSession = getSession(user.id);
  const commandName = casino.name;
  
  logger.starting(`[${user.username}] Starting "${commandName}" in ${getMessageChannelName(message)}`);

  if (existingSession) {
    if (existingSession.game === null && existingSession.lobbyMessageId) {
      try {
        logger.info(`[${user.username}] Deleting previous casino session message`);
      
        await message.channel.messages.delete(existingSession.lobbyMessageId);
      } catch(error) {
        logger.error(`[${user.username}] Command "${commandName}" failed with `, error);
      }
    }

    if (
      existingSession.game !== null &&
      !existingSession.isComplete &&
      existingSession.activeMessageId
    ) {
      try {
        logger.info(`[${user.username}] Deleting previous game session message`);

        await message.channel.messages.delete(existingSession.activeMessageId);
      } catch(error) {
        logger.error(`[${user.username}] Command "${commandName}" failed with `, error);
      }
    }

    if (existingSession?.game === 'roulette') deleteRouletteState(existingSession.sessionId);
  }

  logger.info(`[${user.username}] Deleting previous session`);
  deleteSession(user.id);

  logger.info(`[${user.username}] Creating new session`);
  const session = createSession(user.id);
  
  const sentMessage = await message.reply({
    embeds: [buildCasinoEmbed()],
    components: [buildCasinoGameSelectionMenu(user.id, session.sessionId)],
    files: [casinoEntranceImage],
  });

  setLobbyMessageId(user.id, sentMessage.id);
}