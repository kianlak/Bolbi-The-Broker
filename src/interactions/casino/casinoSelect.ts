import { StringSelectMenuInteraction } from 'discord.js';
import { showRouletteMenu } from './roulette.ts';

export async function handleCasinoSelect(interaction: StringSelectMenuInteraction) {
  const selection = interaction.values[0];

  if (selection === 'roulette') {
    await showRouletteMenu(interaction);
  }
}
