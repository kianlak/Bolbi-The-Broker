import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuInteraction,
  ActionRowBuilder,
} from 'discord.js';

export async function showRouletteNumberModal(
  interaction: StringSelectMenuInteraction,
  ownerId: string,
  sessionId: string
) {
  const modal = new ModalBuilder()
    .setCustomId(
      `ncasino:roulette:set-number-amount:${ownerId}:${sessionId}`
    )
    .setTitle('Single Number Bet');

  const numberInput = new TextInputBuilder()
    .setCustomId('number')
    .setLabel('Choose a number (0-36 or 00)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Example: 7 or 00');

  const amountInput = new TextInputBuilder()
    .setCustomId('amount')
    .setLabel('Bet Amount')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Enter bet amount');

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(numberInput),
    new ActionRowBuilder<TextInputBuilder>().addComponents(amountInput),
  );

  await interaction.showModal(modal);
}
