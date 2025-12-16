import 'dotenv/config';

import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

import { logger } from './shared/logger.ts';

import { commandRouter } from './commandRouter.ts';
import { ensureSchemas } from './database/helper/ensureSchemas.ts';
import { closeSqliteDBConnection, connectToSqliteDB } from './database/sqlite.ts';
import { UserService } from './helper/services/userService.ts';

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
  try {
    await bootstrap();
  } catch (error) {
    logger.error(`Bootstrap failed:\n\t${(error as Error).message}`);
    process.exit(1);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const userService = new UserService();
  userService.ensureUser(message.author.id);

  if (message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID ||
      message.channel.id === process.env.DISCORD_ALLOWED_CHANNEL_ID_DEV) {
    await commandRouter(message);
  }

  return;
});

async function bootstrap() {
  logger.info('Started Bootstrap');

  const db = connectToSqliteDB();
  
  ensureSchemas(db);
  await announceBotReady();

  logger.success('Bootstrap complete');
}

async function announceBotReady() {
  try {
    if (!ANNOUNCEMENT_CHANNEL) throw new Error('Announcement channel could not be found');

    const channel = await client.channels.fetch(ANNOUNCEMENT_CHANNEL);

    if (channel?.isTextBased()) {
      // await (channel as TextChannel).send('`🏪 Bolbi has arrived 🏪`');
    }

    logger.success('Bot status announced');
  } catch (error) {
    logger.error(`Bot status announcement failed:\n\t${(error as Error).message}`);
    process.exit(1);
  }
}

async function shutdown(signal: string) {
  logger.info(`Started shutdown (${signal})`);

  try {
    closeSqliteDBConnection();

    if (!ANNOUNCEMENT_CHANNEL) throw new Error('Announcement channel could not be found');

    const channel = await client.channels.fetch(ANNOUNCEMENT_CHANNEL);

    if (channel?.isTextBased()) {
      // await (channel as TextChannel).send('`🔕 Bolbi has left his stand 🔕`');
    }

    logger.success('Bot status announced');
  } catch (error) {
    logger.error(`Bot status announcement failed:\n\t${(error as Error).message}`);
  } finally {
    client.destroy();
    logger.success('Shutdown complete');
    process.exit(0);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', async (error) => {
  logger.error(`Uncaught exception:\n\t${error.message}`);
  await shutdown('uncaughtException');
});