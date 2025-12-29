import type { Message } from 'discord.js';

import type { UserContext } from '../types/UserContext.ts';
import type { CommandContext } from './types/CommandContext.ts';

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
