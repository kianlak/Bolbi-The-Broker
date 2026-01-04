import type { TextBasedChannel } from 'discord.js';
import { logger } from '../../../../shared/logger.ts';

export async function safeDeleteMessage(
  channel: TextBasedChannel | null,
  username: string,
  messageId?: string,
): Promise<void> {
  if (!channel || !messageId) return;

  try {
    const message = await channel.messages.fetch(messageId);
    await message.delete();
  } catch(error) {
    logger.error(`[${username}] Could not delete previous message, received error `, error);
  }
}
