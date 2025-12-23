import { Client } from 'discord.js';

import { VALID_CHANNEL_IDS } from '../config/channels.ts';

import { interactionRouter } from '../interactions/interactionsRouter.ts';
import { commandRouter } from '../commands/commandRouter.ts';
import { userBootstrap } from '../app/userBootstrap.ts';

export function registerEvents(client: Client) {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!VALID_CHANNEL_IDS.has(message.channelId)) return;

    userBootstrap(message.author.id);
    await commandRouter(message);
  });

  client.on('interactionCreate', interactionRouter);
}
