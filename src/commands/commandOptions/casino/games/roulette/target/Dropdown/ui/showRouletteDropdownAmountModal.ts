import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  LabelBuilder,
  StringSelectMenuInteraction,
  TextDisplayBuilder,
} from 'discord.js';

export async function showRouletteDropdownAmountModal(
  interaction: StringSelectMenuInteraction,
  customId: string,
  availableBalance: number
) {
  const modal = new ModalBuilder()
    .setCustomId(customId)
    .setTitle('Place Your Bet');

  const balanceDisplay = new TextDisplayBuilder()
    .setContent(`💰 **Available Balance:** $${availableBalance}`);

  const amountInput = new TextInputBuilder()
  .setCustomId('amount')
  .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Enter bet amount');

  const amountLabel = new LabelBuilder()
    .setLabel('Bet Amount')
    .setDescription('How much would you like to wager?')
    .setTextInputComponent(amountInput);

  modal.addTextDisplayComponents(balanceDisplay);
  modal.addLabelComponents(amountLabel);
  
  await interaction.showModal(modal);
}
