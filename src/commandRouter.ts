import { Message } from 'discord.js';

import { poke } from './commands/poke.ts';
import { defaultResponse } from './commands/defaultResponse.ts';

const PREFIX = '+';

export async function commandRouter(message: Message) {
  if (!message.content.startsWith(PREFIX)) return;

  const messageSections: string[] = message.content.slice(PREFIX.length).trim().split(/\s+/);
  const command: string | undefined = messageSections.shift()?.toLowerCase();

  switch (command) {
    case 'poke':
      return poke(message);
    default:
      return defaultResponse(message);
  }
}
