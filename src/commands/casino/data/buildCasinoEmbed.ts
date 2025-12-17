import { EmbedBuilder } from 'discord.js';

export function buildCasinoEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🎲 Bolbi\'s Casino')
    .setColor(0x9b59b6)
    .setDescription(
      [
        '**Welcome to Bolbi\'s Casino!**',
        '',
        'Get ready to make lots of money! ...or lose all of it',
      ].join('\n')
    )
    .setFooter({ text: 'Play responsibly! ...or don\'t' });
}
