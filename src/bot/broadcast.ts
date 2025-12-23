import { Client } from 'discord.js';

import { VALID_CHANNELS } from '../config/channels.ts';

import { logger } from '../shared/logger.ts';

import type { LifecycleAnnouncement } from './lifecycleAnnouncements.ts';

export async function broadcastMessages(
  client: Client,
  announcements: LifecycleAnnouncement[]
) {
  const tasks = announcements
    .map(({ channel, embed, files }) => {
      const channelId = VALID_CHANNELS[channel];

      if (!channelId) {
        logger.warn(`Channel ${channel} is not configured, skipping`);
        return null;
      }

      return (async () => {
        try {
          const outgoingChannel = await client.channels.fetch(channelId);

          if (!outgoingChannel || !outgoingChannel.isTextBased()) return;
          if ('send' in outgoingChannel) {
            await outgoingChannel.send({ embeds: [embed], files });
          }
        } catch (error) {
          logger.error(`Failed to send to channel ${channel} with `, error);
        }
      })();
    })
    .filter(Boolean);

  await Promise.allSettled(tasks);
}
