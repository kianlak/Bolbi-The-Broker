import { StringSelectMenuInteraction, MessageFlags } from 'discord.js';

import { ROULETTE_BET_CATEGORIES } from '../constants/ROULETTE_BET_CATEOGIRES.ts';

import { buildCategoryExplanationEmbed } from '../ui/buildCategoryExplanationEmbed.ts';
import { getSession } from '../../../session/sessionManager.ts';
import { buildFixedChoiceButtons } from '../target/Fixed/ui/buildFixedChoicesButtons.ts';

export async function handleRouletteChooseBet(
  interaction: StringSelectMenuInteraction
) {
  const [, , , ownerId, sessionId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ Not your menu.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const session = getSession(ownerId);
  if (!session || session.sessionId !== sessionId) {
    await interaction.reply({
      content: '❌ Session expired.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const categoryId = interaction.values[0];
  const config = ROULETTE_BET_CATEGORIES.find(
    c => c.category === categoryId
  );

  if (!config) return;

  const embed = buildCategoryExplanationEmbed(config);
  const components =
    config.targetType === 'FIXED'
      ? buildFixedChoiceButtons(
          config.category,
          ownerId,
          sessionId
        )
      : [];

  await interaction.update({
    embeds: [embed],
    components,
  });
}
