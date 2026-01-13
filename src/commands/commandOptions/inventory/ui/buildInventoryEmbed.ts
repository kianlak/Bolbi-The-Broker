import { EmbedBuilder } from 'discord.js';

import { CATEGORY_DISPLAY } from '../constants/CATEGORY_DISPLAY.ts';

import type { InventoryByCategory } from '../types/InventoryByCategory.ts';

export function buildInventoryEmbed(
  username: string,
  avatarURL: string | null,
  inventory: InventoryByCategory
): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setTitle(`🎒 ${username}'s Inventory`)
    .setColor(0x5865f2)
    .setThumbnail(avatarURL)
    .setTimestamp();

  let hasItems = false;

  for (const [category, items] of Object.entries(inventory)) {
    if (!items) continue;

    const visibleItems = items.filter(item => item.quantity > 0);
    if (visibleItems.length === 0) continue;

    hasItems = true;

    const display =
      CATEGORY_DISPLAY[category as keyof typeof CATEGORY_DISPLAY];

    const value = visibleItems
      .map(
        item =>
          `▸ ${item.name} x**${item.quantity}** [\`${item.id}\`]`
      )
      .join('\n');

    embed.addFields({
      name: `${display.emoji} **${display.label}**`,
      value,
      inline: false,
    });
  }

  if (!hasItems) {
    embed.setDescription(
      '📭 **Your inventory is empty**\n\nEarn items to view them here'
    );
  } else {
    embed.setFooter({
      text: 'Kian Canes Metaverse Manager',
    });
  }

  return embed;
}