import { StringSelectMenuInteraction } from "discord.js";

import { ROULETTE_BET_CATEGORIES } from "../constants/ROULETTE_BET_CATEOGIRES.ts";

export async function handleRouletteChooseBet(
  interaction: StringSelectMenuInteraction
) {
  const [, , , ownerId, sessionId] =
    interaction.customId.split(':');

  // ownership + session validation (same as before)

  const selectedCategory = interaction.values[0];

  const categoryConfig = ROULETTE_BET_CATEGORIES.find(
    c => c.category === selectedCategory
  );

  if (!categoryConfig) {
    await interaction.reply({ ephemeral: true, content: 'Invalid bet' });
    return;
  }

  switch (categoryConfig.targetType) {
    case 'FIXED':
      // update UI to show fixed options (red/black, even/odd, etc.)
      break;

    default:
      await interaction.reply({
        ephemeral: true,
        content: 'This bet type is coming soon.',
      });
  }
}
