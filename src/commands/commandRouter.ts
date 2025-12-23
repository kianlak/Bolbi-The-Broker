import { Message } from 'discord.js';

import { COMMANDS } from './registry.ts';

import { logger } from '../shared/logger.ts';

import { parseCommand } from './parseCommand.ts';
import { commandAliases } from '../data/commandAliases.ts';
import { defaultResponse } from '../commandsOLD/defaultResponse.ts';
import { enforceChannel } from './guards/enforceChannel.ts';
import { enforceArgs } from './guards/enforceArgs.ts';

export async function commandRouter(message: Message) {
  const parsed = parseCommand(message.content);
  if (!parsed) return;

  const commandName =
    commandAliases[parsed.command] ?? parsed.command;

  const definition = COMMANDS[commandName];

  logger.info(
    `${message.author.username} requested "${commandName}" with args: ${parsed.args.join(' ')}`
  );

  if (!definition) {
    return defaultResponse(message);
  }

  const ctx = {
    message,
    args: parsed.args,
    raw: parsed.raw,
  };

  // Channel guard
  const channelAllowed = await enforceChannel(
    message,
    definition.allowedChannelId
  );
  if (!channelAllowed) return;

  // Argument guard
  const argsAllowed = await enforceArgs(
    ctx,
    definition.minArgs,
    definition.maxArgs,
    definition.usage
  );
  if (!argsAllowed) return;

  return definition.execute(ctx);
}
