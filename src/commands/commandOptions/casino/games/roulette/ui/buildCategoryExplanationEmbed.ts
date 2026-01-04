import { EmbedBuilder } from 'discord.js';

import type { RouletteBetCategoryConfig } from '../types/RouletteBetCategoryConfig.ts';

export function buildCategoryExplanationEmbed(
  config: RouletteBetCategoryConfig
): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(`🎡 ${config.label}`)
    .setDescription(config.description)
    .setColor(0xc0392b);
}
