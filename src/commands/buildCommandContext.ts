import type { Message } from 'discord.js';

import type { CommandContext } from './types/types.ts';

export function buildCommandContext(
  message: Message,
  parsed: { 
    args: string[]; 
    raw: string 
  }
): CommandContext {
  return {
    message,
    args: parsed.args,
    raw: parsed.raw,
  };
}
