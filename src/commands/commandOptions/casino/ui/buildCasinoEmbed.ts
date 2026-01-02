import { AttachmentBuilder, EmbedBuilder } from 'discord.js';

export function buildCasinoEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🎲 Thanos Casino')
    .setColor(0x9b59b6)
    .setDescription(
      [
        '**Welcome to Thanos Casino!**',
        '',
        'Get ready to lose half your money! ...or more',
      ].join('\n')
    )
    .setImage('attachment://casinoEntrance.png')
    .setFooter({ text: 'Sponsored By Thanos Casino' });
}
