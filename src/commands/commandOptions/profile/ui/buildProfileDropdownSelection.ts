import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

export function buildProfileDropdownSelection(viewerId: string, targetId: string) {
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`profile:menu:${viewerId}:${targetId}`)
      .setPlaceholder('Select profile page')
      .addOptions({
        label: 'Main Profile',
        value: 'main',
        emoji: '🧍',
      })
  );
}

