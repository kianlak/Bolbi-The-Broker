import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';


export function buildProfileMenu(userId: string) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`profile-menu:${userId}`)
      .setPlaceholder('Select profile page')
      .addOptions([
        {
          label: 'Main Profile',
          value: 'main',
          emoji: '🧍',
        },
        {
          label: 'Roulette',
          value: 'roulette',
          emoji: '🎡',
        },
      ])
  );
}
