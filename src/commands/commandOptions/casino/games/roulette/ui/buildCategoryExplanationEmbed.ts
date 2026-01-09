import { EmbedBuilder, StringSelectMenuInteraction } from 'discord.js';

import type { CacheType } from 'discord.js';

import { UserService } from '../../../../../../services/user/userService.ts';
import { getRouletteState } from '../rouletteSessionStore.ts';

import type { RouletteBetCategoryConfig } from '../types/RouletteBetCategoryConfig.ts';

export function buildCategoryExplanationEmbed(
  config: RouletteBetCategoryConfig,
  interaction: StringSelectMenuInteraction<CacheType>
): EmbedBuilder {
  const [, , , , sessionId] = interaction.customId.split(':');
  const userService = new UserService();
  const balance = userService.getUserBalance(interaction.user.id);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;

  return new EmbedBuilder()
    .setTitle(`🎡 ${config.label}`)
    .setImage('attachment://rouletteTable.png')
    .setThumbnail(interaction.user.displayAvatarURL())
    .setDescription(config.description)
    .addFields(
      {
        name: `💰 Balance $${available}`,
        value: ``,
        inline: true,
      }
    )
    .setColor(0xc0392b);
}
