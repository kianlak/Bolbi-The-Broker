import {
  EmbedBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';

import { buildBetCategoryMenu } from './roulette/data/buildBetCategoryMenu.ts';

export async function handleCasinoSelect(
  interaction: StringSelectMenuInteraction
) {
  const selectedGame = interaction.values[0];

  switch (selectedGame) {
    case 'roulette':
      const embed = new EmbedBuilder()
        .setTitle('🎡 Roulette')
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setDescription(
          [
            'Welcome to Roulette.',
            '',
            'Choose a bet type to get started.',
          ].join('\n')
        )
        .setColor(0xc0392b);

      await interaction.update({
        embeds: [embed],
        components: [
          buildBetCategoryMenu(interaction.user.id),
        ],
      });
      break;
    default:
      break;
  }
}
