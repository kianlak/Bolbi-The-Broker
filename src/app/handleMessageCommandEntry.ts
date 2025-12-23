import { Message } from 'discord.js';

import { VALID_CHANNEL_IDS } from '../config/channels.ts';

import { userBootstrap } from './userBootstrap.ts';
import { commandRouter } from '../commands/commandRouter.ts';
import { userContextFromMessage } from './userContextAdapters.ts';

export async function handleMessageCommandEntry(message: Message) {
  if (message.author.bot) return;
  if (!VALID_CHANNEL_IDS.has(message.channelId)) return;
  
  userBootstrap(userContextFromMessage(message));
  await commandRouter(message);
}
