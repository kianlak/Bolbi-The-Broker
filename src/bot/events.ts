import { Client } from 'discord.js';

import { handleMessageCommandEntry } from '../app/handleMessageCommandEntry.ts';
import { handleInteractionCommandEntry } from '../app/handleInteractionCommandEntry.ts';

export function registerEvents(client: Client) {
  client.on('messageCreate', handleMessageCommandEntry);
  client.on('interactionCreate', handleInteractionCommandEntry);
}
