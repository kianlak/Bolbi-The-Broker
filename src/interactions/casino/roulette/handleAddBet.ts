import {
  StringSelectMenuInteraction,
  EmbedBuilder,
} from 'discord.js';
import { RouletteBetCategory } from './types/RouletteBetCategory.ts';
import { buildColorTargetButtons } from './data/buildColorTargetButton.ts';
import { buildEvenOddTargetButtons } from './data/buildEvenOddTargetButton.ts';
import { buildNumberTargetModal } from './data/buildNumberTargetModal.ts';


export async function handleAddBet(
  interaction: StringSelectMenuInteraction
) {
  const category = interaction.values[0] as RouletteBetCategory;
  const ownerId = interaction.user.id;

  const embed = new EmbedBuilder()
    .setTitle('🎯 Choose Bet Target')
    .setDescription(`Bet type: **${category}**`)
    .setColor(0xf1c40f);

  switch (category) {
    case 'COLOR':
      return interaction.update({
        embeds: [embed],
        components: [buildColorTargetButtons(ownerId)],
      });

    case 'EVEN_ODD':
      return interaction.update({
        embeds: [embed],
        components: [buildEvenOddTargetButtons(ownerId)],
      });

    case 'NUMBER':
      return interaction.showModal(
        buildNumberTargetModal(ownerId)
      );

    default:
      return;
  }
}
