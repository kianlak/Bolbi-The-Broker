import { Message } from 'discord.js';

import { logger } from './shared/logger.ts';

import { commandAliases } from './data/commandAliases.ts';
import { defaultResponse } from './commands/defaultResponse.ts';
import { beg } from './commands/beg/beg.ts';
import { casino } from './commands/casino/casino.ts';
import { profile } from './commands/profile/profile.ts';

const PREFIX = '+';

export async function commandRouter(message: Message) {
  const rawInput: string = message.content;
  const commandMatch = rawInput.match(new RegExp(`^\\${PREFIX}\\S+`));

  if (!rawInput.startsWith(PREFIX) || !commandMatch) return;

  const rawCommand: string = commandMatch[0].slice(PREFIX.length);
  const command: string = commandAliases[rawCommand] ?? rawCommand;

  logger.info(message.author.username + " has requested command " + command);

  switch (command) {
    case 'beg':
      return beg(message);
    case 'profile':
      return profile(message);
    case 'casino':
      return casino(message);
    default:
      logger.info(message.author.username + "'s command (" + command + ") does not exist, routing to default response");
      return defaultResponse(message);
  }
}
