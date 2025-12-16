import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  StringSelectMenuInteraction,
} from 'discord.js';
import { spinRoulette } from './gameLogic/roulette/rouletteLogic.ts';


export async function showRouletteMenu(
  interaction: StringSelectMenuInteraction
) {
  const userId = interaction.user.id;

  const embed = new EmbedBuilder()
    .setTitle('🎰 Roulette')
    .setDescription('Place your bet!\n\nChoose a color.')
    .setColor(0xe74c3c);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`casino:roulette:${userId}:red`)
      .setLabel('🔴 Red')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId(`casino:roulette:${userId}:black`)
      .setLabel('⚫ Black')
      .setStyle(ButtonStyle.Secondary)
  );

  await interaction.update({
    embeds: [embed],
    components: [row],
  });
}

export async function handleRouletteSpin(
  interaction: ButtonInteraction
) {
  const [, , ownerId, bet] = interaction.customId.split(':') as [
    string,
    string,
    string,
    'red' | 'black'
  ];

  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '❌ This roulette game isn\'t yours.',
      ephemeral: true,
    });
    return;
  }

  const { result, won } = spinRoulette(bet);

  const embed = new EmbedBuilder()
    .setTitle('🎡 Roulette Result')
    .setDescription(
      `🎯 **Result:** ${
        result === 'red' ? '🔴 Red' : '⚫ Black'
      }\n\n` +
      (won ? '🎉 **You won!**' : '❌ **You lost!**')
    )
    .setColor(won ? 0x2ecc71 : 0xe74c3c);

  await interaction.update({
    embeds: [embed],
    components: [],
  });
}
