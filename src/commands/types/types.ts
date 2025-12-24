import type { Message } from 'discord.js';

export type CommandContext = {
  message: Message;
  args: string[];
  raw: string;
};

export type CommandInfo = {
  execute: (commandContext: CommandContext) => Promise<unknown>;

  allowedChannelId?: string;
  minArgs?: number;
  maxArgs?: number;
  usage?: string;
  description?: string;
};
