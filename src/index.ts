import 'dotenv/config';

import { Client, GatewayIntentBits } from 'discord.js';

import { logger } from './shared/logger.ts';

import { commandRouter } from './commandRouter.ts';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.once('ready', () => {
  logger.info("Bot is live");
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID ||
      message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID_DEV) {
    await commandRouter(message);
  }

  return;
});