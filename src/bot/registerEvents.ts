import { Client } from 'discord.js';

import { interactionRouter } from '../interactions/interactionsRouter.ts';
import { handleMessageCommandEntry } from '../app/handleMessageCommandEntry.ts';
import { handleInteractionCommandEntry } from '../app/handleInteractionCommandEntry.ts';

export function registerEvents(client: Client) {
  client.on('messageCreate', handleMessageCommandEntry);
  client.on('interactionCreate', handleInteractionCommandEntry);
}
