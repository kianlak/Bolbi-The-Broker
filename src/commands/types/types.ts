import type { Message } from 'discord.js';

import type { UserContext } from '../../types/UserContext.ts';

export type CommandContext = {
  message: Message;
  user: UserContext;
  command: string;
  args?: string[];
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
