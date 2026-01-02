import { EmbedBuilder } from 'discord.js';

export function buildRouletteWelcomeEmbed(
  userTag: string,
  avatarUrl: string,
): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('🎡 Roulette')
    .setAuthor({
      name: userTag,
      iconURL: avatarUrl,
    })
    .setThumbnail(avatarUrl)
    .setDescription(
      [
        'Welcome to Roulette.',
        '',
        'Choose what type of bet(s) you want to put in',
      ].join('\n')
    )
    .setImage('attachment://rouletteTable.png')
    .setColor(0xc0392b);
}