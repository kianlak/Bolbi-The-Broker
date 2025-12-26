import { Client } from 'discord.js';

import { logger } from '../shared/logger.ts';

import { LIFECYCLE_ANNOUNCEMENTS } from './lifecycleAnnouncements.ts';

import { shutdownSqliteDB } from '../database/sqlite.ts';
import { broadcastMessages } from './broadcast.ts';

export async function onReady(client: Client) {
  // await broadcastMessages(client, LIFECYCLE_ANNOUNCEMENTS.ready);
}

export async function onShutdown(client: Client, signal: string) {
  logger.starting(`[BOT] Starting Shutdown with code: (${signal})`);

  shutdownSqliteDB();

  try {
    // await broadcastMessages(client, LIFECYCLE_ANNOUNCEMENTS.shutdown);
  } finally {
    client.destroy();
    logger.success('[BOT] Shutdown successful');
  }
}
