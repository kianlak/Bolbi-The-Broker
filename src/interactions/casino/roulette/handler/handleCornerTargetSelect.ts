import {
  EmbedBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';
import { buildConfirmCornerTarget } from '../data/buildConfirmCornerTarget.ts';

export async function handleCornerTargetSelect(
  interaction: StringSelectMenuInteraction
) {
  const [, , category, ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const target = interaction.values[0];
  const label = target.replace('CORNER_', '').replaceAll('_', '–');

  const embed = new EmbedBuilder()
    .setTitle('🎯 Corner Selected')
    .setDescription(
      `You selected **${label}**.\n\nClick below to enter your wager.`
    )
    .setColor(0xf1c40f);

  await interaction.update({
    embeds: [embed],
    components: [
      buildConfirmCornerTarget(ownerId, target),
    ],
  });
}
