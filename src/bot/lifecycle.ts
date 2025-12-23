import { Client, TextChannel } from 'discord.js';
import { logger } from '../shared/logger.ts';
import { BOLBI_STAND_CHANNEL } from '../config/channels.ts';
import { shutdownSqliteDB } from '../database/sqlite.ts';

export async function onReady(client: Client) {
  logger.success('Bot ready');

  if (!BOLBI_STAND_CHANNEL) return;

  const channel = await client.channels.fetch(BOLBI_STAND_CHANNEL);
  if (channel?.isTextBased()) {
    // await (channel as TextChannel).send('🏪 Bolbi has arrived');
  }
}

export async function onShutdown(client: Client, signal: string) {
  logger.info(`Shutdown started (${signal})`);

  shutdownSqliteDB();

  try {
    if (!BOLBI_STAND_CHANNEL) throw new Error('#🤑-bolbis-trade-post could not be found');
    
    const channel = await client.channels.fetch(BOLBI_STAND_CHANNEL);
    if (channel?.isTextBased()) {
      // await (channel as TextChannel).send('🔕 Bolbi has left');
    }
  } finally {
    client.destroy();
  }
}
