import 'dotenv/config';

import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

import { logger } from './shared/logger.ts';

import { commandRouter } from './commandRouter.ts';

const ANNOUNCEMENT_CHANNEL = process.env.DISCORD_ALLOWED_CHANNEL_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.once('ready', async () => {
  startup();
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID ||
      message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID_DEV) {
    await commandRouter(message);
  }

  return;
});

async function startup() {
  logger.info(`Startup signal received`);

  try {
    if (!ANNOUNCEMENT_CHANNEL) {
      logger.error("Announcement Channel could not be found or is invalid");
      throw new Error();
    }

    const channel = await client.channels.fetch(ANNOUNCEMENT_CHANNEL);

    if (channel?.isTextBased()) {
      await (channel as TextChannel).send('`🏪 Bolbi has arrived 🏪`');

      logger.success('Announcement has been sent');
    }
  } catch (error) {
    logger.error(`Failed to send startup message:\n\t${(error as Error).message}`);
  }
}

async function shutdown(signal: string) {
  logger.info(`Shutdown signal received: ${signal}`);

  try {
    if (!ANNOUNCEMENT_CHANNEL) {
      logger.error("Announcement Channel could not be found or is invalid");
      throw new Error();
    }

    const channel = await client.channels.fetch(ANNOUNCEMENT_CHANNEL);

    if (channel?.isTextBased()) {
      await (channel as TextChannel).send('`🔕 Bolbi has left his stand 🔕`');

      logger.success('Shutdown message has been sent');
    }
  } catch (err) {
    logger.error(`Failed to send shutdown message:\n\t${(err as Error).message}`);
  } finally {
    client.destroy();
    process.exit(0);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', async (error) => {
  logger.error(`Uncaught exception: ${error.message}`);
  await shutdown('uncaughtException');
});