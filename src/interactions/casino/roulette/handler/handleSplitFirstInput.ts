import {
  ModalSubmitInteraction,
  EmbedBuilder,
} from 'discord.js';

import { parseRouletteNumber } from '../parseRouletteNumber.ts';
import { buildSplitSecondButtons } from '../data/buildSplitSecondButton.ts';

export async function handleSplitFirstInput(
  interaction: ModalSubmitInteraction
) {
  const [, , ownerId] = interaction.customId.split(':');

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }

  const raw = interaction.fields.getTextInputValue('first');
  const first = parseRouletteNumber(raw);

  if (first === null) {
    await interaction.reply({
      content: '❌ Invalid number. Enter 0–36 or 00.',
      ephemeral: true,
    });
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle('🎯 Choose Adjacent Number')
    .setDescription(
      `First number selected: **${first === 37 ? '00' : first}**\n\n` +
      `Choose an adjacent number to complete your split.`
    )
    .setColor(0xf1c40f);

  await interaction.reply({
    embeds: [embed],
    components: buildSplitSecondButtons(first, ownerId),
  });
}
