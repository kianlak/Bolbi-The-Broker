import type { CommandContext } from './CommandContext.ts';

export type CommandInfo = {
  execute: (commandContext: CommandContext) => Promise<unknown>;

  allowedChannelId?: string;
  minArgs?: number;
  maxArgs?: number;
  usage?: string;
  description?: string;
};
