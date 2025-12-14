import { Message } from 'discord.js';

import { logger } from './shared/logger.ts';

import { poke } from './commands/poke.ts';
import { defaultResponse } from './commands/defaultResponse.ts';

const PREFIX = '+';

export async function commandRouter(message: Message) {
  if (!message.content.startsWith(PREFIX)) return;

  const messageSections: string[] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const command: string | undefined = messageSections.shift()?.toLowerCase();

  logger.info(message.author.username + " has requested command " + command);

  switch (command) {
    // case 'poke':
    //   return poke(message);
    default:
      logger.info(message.author.username + "'s command (" + command + ") does not exist, resulting to default response");
      return defaultResponse(message);
  }
}
