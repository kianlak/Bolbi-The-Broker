import { Message } from 'discord.js';

import { logger } from './shared/logger.ts';

import { commandAliases } from './data/commandAliases.ts';
import { defaultResponse } from './commands/defaultResponse.ts';
import { poke } from './commands/poke.ts';

const PREFIX = '+';

export async function commandRouter(message: Message) {
  const rawInput: string = message.content;
  const commandMatch = rawInput.match(new RegExp(`^\\${PREFIX}\\S+`));

  if (!rawInput.startsWith(PREFIX) || !commandMatch) return;

  const rawCommand: string = commandMatch[0].slice(PREFIX.length);
  const command: string = commandAliases[rawCommand] ?? rawCommand;

  logger.info(message.author.username + " has requested command " + command);

  switch (command) {
    // case 'poke':
    //   return poke(message);
    default:
      logger.info(message.author.username + "'s command (" + command + ") does not exist, resulting to default response");
      return defaultResponse(message);
  }
}
