import type { Message } from 'discord.js';

import { logger } from '../../../shared/logger.ts';

import { selectDefaultPrompt } from './selectDefaultPrompts.ts';
import { getMessageChannelName } from '../../../helper/getMessageChannelName.ts';

export async function defaultResponse(message: Message) {
  const prompt = selectDefaultPrompt(message.channelId);
  const channelName = getMessageChannelName(message);
  
  try {
    logger.info(`[${message.author.username}] Sending default response to ${channelName}`);
    
    await message.reply(`*${prompt}*`);

    logger.success(`[${message.author.username}] Default response complete`);
  } catch (error) {
    logger.error(`[${message.author.username}] Failed default response`, error);
  }
}
