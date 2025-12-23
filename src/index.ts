import 'dotenv/config';

import { DISCORD_BOT_TOKEN } from './config/env.ts';

import { createClient } from './bot/client.ts';
import { registerEvents } from './bot/events.ts';
import { bootstrapDatabase } from './database/bootstrapDatabase.ts';
import { onReady, onShutdown } from './bot/lifecycle.ts';

const client = createClient();
client.login(DISCORD_BOT_TOKEN);

registerEvents(client);

client.once('clientReady', async () => {
  await bootstrapDatabase();
  await onReady(client);
});

process.on('SIGINT', () => onShutdown(client, 'SIGINT'));
process.on('SIGTERM', () => onShutdown(client, 'SIGTERM'));