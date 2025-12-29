import { Message } from "discord.js";

import type { UserContext } from "../../types/UserContext.ts";

export type CommandContext = {
  message: Message;
  user: UserContext;
  command: string;
  args?: string[];
  raw: string;
};