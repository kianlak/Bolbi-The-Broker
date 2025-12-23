import { Message } from 'discord.js';

export type CommandContext = {
  message: Message;
  args: string[];
  raw: string;
};

export type CommandDefinition = {
  execute: (ctx: CommandContext) => Promise<unknown>;
  allowedChannelId?: string;
  minArgs?: number;
  maxArgs?: number;
  usage?: string;
};
