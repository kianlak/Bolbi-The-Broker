import { AttachmentBuilder, EmbedBuilder, StringSelectMenuInteraction } from 'discord.js';

import type { CacheType } from 'discord.js';

import type { RouletteBetCategoryConfig } from '../types/RouletteBetCategoryConfig.ts';

export function buildCategoryExplanationEmbed(
  config: RouletteBetCategoryConfig,
  interaction: StringSelectMenuInteraction<CacheType>
): EmbedBuilder {

  return new EmbedBuilder()
    .setTitle(`🎡 ${config.label}`)
    .setImage('attachment://rouletteTable.png')
    .setThumbnail(interaction.user.displayAvatarURL())
    .setDescription(config.description)
    .setColor(0xc0392b);
}
