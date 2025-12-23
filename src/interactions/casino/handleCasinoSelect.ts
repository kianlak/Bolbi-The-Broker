import { StringSelectMenuInteraction } from 'discord.js';

import { rouletteWelcomeEmbed } from './roulette/embedHelper/rouletteWelcomeEmbed.ts';

export async function handleCasinoSelect(interaction: StringSelectMenuInteraction) {
  const selectedGame = interaction.values[0];

  switch (selectedGame) {
    case 'roulette':
      rouletteWelcomeEmbed(interaction);
      break;
    default:
      break;
  }
}
