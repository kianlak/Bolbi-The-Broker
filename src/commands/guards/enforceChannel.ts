import { Message } from 'discord.js';

import { logger } from '../../shared/logger.ts';

export async function enforceChannel(
  message: Message,
  allowedChannelId?: string
): Promise<boolean> {
  if (!allowedChannelId) return true;

  if (message.channel.id !== allowedChannelId) {
    logger.info(
      `${message.author.username} attempted command in wrong channel`
    );

    const reply = await message.reply(
      `🚫 This command can only be used in <#${allowedChannelId}>`
    );

    setTimeout(() => reply.delete().catch(() => {}), 10000);

    return false;
  }

  return true;
}
