import {
  StringSelectMenuInteraction,
  EmbedBuilder,
} from 'discord.js';
import { RouletteBetCategory } from '../types/RouletteBetCategory.ts';
import { buildColorTargetButtons } from '../data/buildColorTargetButton.ts';
import { buildEvenOddTargetButtons } from '../data/buildEvenOddTargetButton.ts';
import { buildNumberTargetModal } from '../data/buildNumberTargetModal.ts';
import { buildLowHighTargetButtons } from '../data/buildLowHighTargetButton.ts.ts';
import { buildDozenTargetButtons } from '../data/buildDozenTargetButton.ts';
import { buildColumnTargetButtons } from '../data/buildColumnTargetButton.ts';
import { buildDoubleStreetTargetMenu } from '../data/buildDoubleStreetTargetMenu.ts';
import { buildStreetTargetMenu } from '../data/buildStreetTargetMenu.ts';


export async function handleAddBet(
  interaction: StringSelectMenuInteraction
) {
  const category = interaction.values[0] as RouletteBetCategory;
  const ownerId = interaction.user.id;

  const embed = new EmbedBuilder()
    .setTitle('🎯 Choose Bet Target')
    .setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL()
    })
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

    case 'LOW_HIGH':
      return interaction.update({
        embeds: [embed],
        components: [buildLowHighTargetButtons(ownerId)],
      });
    
    case 'DOZEN':
      return interaction.update({
        embeds: [embed],
        components: [buildDozenTargetButtons(ownerId)],
      });
    
    case 'COLUMN':
      return interaction.update({
        embeds: [embed],
        components: [buildColumnTargetButtons(ownerId)],
      });
    
    case 'DOUBLE_STREET':
      return interaction.update({
        embeds: [embed],
        components: [buildDoubleStreetTargetMenu(ownerId)],
      });

    case 'STREET':
      return interaction.update({
        embeds: [embed],
        components: [buildStreetTargetMenu(ownerId)],
      });

    default:
      return;
  }
}
