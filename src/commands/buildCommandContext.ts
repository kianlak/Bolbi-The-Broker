import type { Message } from 'discord.js';

import type { CommandContext } from './types/types.ts';
import type { UserContext } from '../types/UserContext.ts';

export function buildCommandContext(
  message: Message,
  user: UserContext,
  parsed: {
    command: string;
    args: string[]; 
    raw: string 
  }
): CommandContext {
  return {
    message,
    user: user,
    command: parsed.command,
    args: parsed.args,
    raw: parsed.raw,
  };
}
