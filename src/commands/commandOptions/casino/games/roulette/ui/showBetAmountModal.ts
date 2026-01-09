import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonInteraction,
  LabelBuilder,
  StringSelectMenuInteraction,
} from 'discord.js';

export async function showBetAmountModal(
  interaction: ButtonInteraction | StringSelectMenuInteraction,
  customId: string
) {
  const modal = new ModalBuilder()
    .setCustomId(customId)
    .setTitle('Place Your Bet');

  const amountInput = new TextInputBuilder()
    .setCustomId('amount')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Enter your bet amount')
    .setRequired(true);

  const amountLabel = new LabelBuilder()
    .setLabel('Bet Amount')
    .setDescription('How much would you like to wager?')
    .setTextInputComponent(amountInput);

  modal.addLabelComponents(amountLabel);

  await interaction.showModal(modal);
}
