import { EmbedBuilder, AttachmentBuilder } from 'discord.js';

import type { ChannelKey } from '../config/channels.ts';

export type LifecycleEvent = 'ready' | 'shutdown';

export type LifecycleAnnouncement = {
  channel: ChannelKey;
  embed: EmbedBuilder;
  files: AttachmentBuilder[];
};

export const LIFECYCLE_ANNOUNCEMENTS: Record<
  LifecycleEvent,
  LifecycleAnnouncement[]
> = {
  ready: [
    {
      channel: 'BOLBI_STAND',
      embed: new EmbedBuilder()
        .setTitle('🏪 Bolbi Has Arrived')
        .setDescription('Shop is now open')
        .setColor(0x2ecc71)
        .setImage('attachment://bolbiAtStand.png')
        .setFooter({ text: 'Bolbi wishes you\'d stop begging in front of his shop' })
        .setTimestamp(),
      files: [
        new AttachmentBuilder(
          './src/assets/images/bolbiAtStand.png',
          { name: 'bolbiAtStand.png' }
        ),
      ],
    },
    {
      channel: 'THANOS_CASINO',
      embed: new EmbedBuilder()
        .setTitle('🎲 Thanos Has Arrived')
        .setDescription('Casino is now open')
        .setColor(0x2ecc71)
        .setImage('attachment://thanosAtCasino.png')
        .setFooter({ text: 'Thanos wants you to gamble' })
        .setTimestamp(),
      files: [
        new AttachmentBuilder(
          './src/assets/images/thanosAtCasino.png',
          { name: 'thanosAtCasino.png' }
        ),
      ],
    },
  ],

  shutdown: [
    {
      channel: 'BOLBI_STAND',
      embed: new EmbedBuilder()
        .setTitle('🔕 Bolbi Has Left')
        .setDescription('Shop is closed')
        .setColor(0xe74c3c)
        .setImage('attachment://bolbiLeavingStand.png')
        .setFooter({ text: 'Bolbi is just happy the day is over with' })
        .setTimestamp(),
      files: [
        new AttachmentBuilder(
          './src/assets/images/bolbiLeavingStand.png',
          { name: 'bolbiLeavingStand.png' }
        ),
      ],
    },
    {
      channel: 'THANOS_CASINO',
      embed: new EmbedBuilder()
        .setTitle('🔕 Thanos Has Left')
        .setDescription('Casino is closed')
        .setColor(0xe74c3c)
        .setImage('attachment://thanosLeavingCasino.png')
        .setFooter({ text: 'Thanos stares at you as you leave... ominously' })
        .setTimestamp(),
      files: [
        new AttachmentBuilder(
          './src/assets/images/thanosLeavingCasino.png',
          { name: 'thanosLeavingCasino.png' }
        ),
      ],
    },
  ],
};
