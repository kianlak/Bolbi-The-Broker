import type { Message } from 'discord.js';

import { COMMAND_INFO } from './constant/commandRegistry.ts';

import { logger } from '../shared/logger.ts';

import { parseCommand } from './parseCommand.ts';
import { commandAliases } from './constant/commandAliases.ts';
import { defaultResponse } from './commandOptions/defaultResponse/defaultResponse.ts';
import { buildCommandContext } from './buildCommandContext.ts';
import { runGuards } from './guards/runGuards.ts';

export async function commandRouter(message: Message) {
  const parsed = parseCommand(message.content);
  if (!parsed) return;

  const commandName = commandAliases[parsed.command] ?? parsed.command;
  const commandInfo = COMMAND_INFO[commandName];

  logger.info(
    `[${message.author.username}] Requested command "${commandName}"` +
      (parsed.args.length ? ` with args: ${parsed.args.join(' ')}` : '')
  );

  if (commandName === "") logger.info(`[${message.author.username}] Ignoring request`);
  
  if (!commandInfo) {
    logger.warn(`[${message.author.username}] Command "${commandName}" seems to be missing metadata, routing to command "defaultResponse"`);
    await defaultResponse(message);
    return;
  }

  const commandContext = buildCommandContext(message, parsed);

  if (!(await runGuards(commandContext, commandInfo))) return;

  await commandInfo.execute(commandContext);
}