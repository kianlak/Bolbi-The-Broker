import {
  EmbedBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';

import { buildConfirmDoubleStreetTarget } from '../data/buildConfirmDoubleStreetTarget.ts';

export async function handleDoubleStreetTargetSelect(
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

  const label = target
    .replace('DS_', '')
    .replace('_', '-');

  const embed = new EmbedBuilder()
    .setTitle('🎯 Double Street Selected')
    .setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setDescription(
      `You selected **${label}**.\n\nClick below to enter your wager.`
    )
    .setColor(0xf1c40f);

  await interaction.update({
    embeds: [embed],
    components: [
      buildConfirmDoubleStreetTarget(ownerId, target),
    ],
  });
}
