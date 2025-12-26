import type { Message } from 'discord.js';

import { logger } from '../../../shared/logger.ts';

import { selectDefaultPrompt } from './selectDefaultPrompts.ts';
import { getMessageChannelName } from '../../../helper/getMessageChannelName.ts';

import type { UserContext } from '../../../types/UserContext.ts';

export async function defaultResponse(message: Message, user: UserContext) {
  const prompt = selectDefaultPrompt(message.channelId);
  const channelName = getMessageChannelName(message);
  const commandName = defaultResponse.name;
  
  try {
    logger.starting(`[${user.username}] Sending "${commandName}" to ${channelName}`);
    
    await message.reply(`*${prompt}*`);

    logger.success(`[${user.username}] Command "${commandName}" complete`);
  } catch (error) {
    logger.error(`[${user.username}] Command "${commandName}" failed with `, error);
  }
}
