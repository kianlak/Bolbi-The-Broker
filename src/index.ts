import 'dotenv/config';

import { ALLOWED_CHANNELS } from './data/constants.ts';

import { Client, GatewayIntentBits, TextChannel } from 'discord.js';

import { logger } from './shared/logger.ts';

import { commandRouter } from './commandRouter.ts';
import { interactionRouter } from './interactions/interactionsRouter.ts';
import { ensureSchemas } from './database/helper/ensureSchemas.ts';
import { closeSqliteDBConnection, connectToSqliteDB } from './database/sqlite.ts';
import { UserService } from './helper/services/UserService/userService.ts';

const MAIN_CHANNEL = process.env.DISCORD_MAIN_CHANNEL_ID;

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

  if (ALLOWED_CHANNELS.has(message.channel.id)) {
    userService.ensureUser(message.author.id);

    await commandRouter(message);
  }

  return;
});

client.on('interactionCreate', async (interaction) => {
  try {
    await interactionRouter(interaction);
  } catch (err) {
    console.error('Interaction error:', err);
  }
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
    if (!MAIN_CHANNEL) throw new Error('Announcement channel could not be found');

    const channel = await client.channels.fetch(MAIN_CHANNEL);

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

    if (!MAIN_CHANNEL) throw new Error('Announcement channel could not be found');

    const channel = await client.channels.fetch(MAIN_CHANNEL);

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