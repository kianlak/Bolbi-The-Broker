import { enforceChannel } from './enforceChannel.ts';
import { enforceArgs } from './enforceArgs.ts';

import type{ CommandContext } from '../types/CommandContext.ts';
import type { CommandInfo } from '../types/CommandInfo.ts';


export async function runGuards(
  commandContext: CommandContext,
  commandInfo: CommandInfo
): Promise<boolean> {
  if (!(await enforceChannel(commandContext.message, commandInfo.allowedChannelId))) return false;

  if (
    !(await enforceArgs(
      commandContext,
      commandInfo.minArgs,
      commandInfo.maxArgs,
      commandInfo.usage
    ))
  ) {
    return false;
  }

  return true;
}
