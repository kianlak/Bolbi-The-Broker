import type { Message } from 'discord.js';

import { COMMAND_INFO } from './constant/commandRegistry.ts';

import { logger } from '../shared/logger.ts';

import { parseCommand } from './parseCommand.ts';
import { commandAliases } from './constant/commandAliases.ts';
import { defaultResponse } from './commandOptions/defaultResponse/defaultResponse.ts';
import { buildCommandContext } from './buildCommandContext.ts';
import { runGuards } from './guards/runGuards.ts';
import type { UserContext } from '../types/UserContext.ts';

export async function commandRouter(message: Message) {
  const parsed = parseCommand(message.content);
  if (!parsed) return;

  const user: UserContext = {
    username: message.author.username, 
    id: message.author.id 
  };

  const commandName = commandAliases[parsed.command] ?? parsed.command;
  const commandInfo = COMMAND_INFO[commandName];

  logger.info(
    `[${user.username}] Requested command "${commandName}"` +
      (parsed.args.length ? ` with args: ${parsed.args.join(' ')}` : '')
  );

  if (commandName === "") logger.info(`[${user.username}] Ignoring request`);
  
  if (!commandInfo) {
    logger.warn(`[${user.username}] Command "${commandName}" does not exist or metadata is missing, routing to command "defaultResponse"`);
    await defaultResponse(message, user);
    return;
  }

  const commandContext = buildCommandContext(message, user, parsed);

  if (!(await runGuards(commandContext, commandInfo))) return;

  await commandInfo.execute(commandContext);
}