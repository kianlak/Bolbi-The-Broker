import { ALLOWED_CHANNELS } from '../config/channels.ts';

import { Client } from 'discord.js';

import { interactionRouter } from '../interactions/interactionsRouter.ts';
import { ensureUserAndInitialize } from '../helper/ensureUserAndUtilize.ts';
import { commandRouter } from '../commands/commandRouter.ts';

export function registerEvents(client: Client) {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!ALLOWED_CHANNELS.has(message.channelId)) return;

    ensureUserAndInitialize(message.author.id);
    await commandRouter(message);
  });

  client.on('interactionCreate', interactionRouter);
}
