import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonInteraction,
} from 'discord.js';

export async function showBetAmountModal(
  interaction: ButtonInteraction,
  customId: string
) {
  const modal = new ModalBuilder()
    .setCustomId(customId)
    .setTitle('Place Your Bet');

  const input = new TextInputBuilder()
    .setCustomId('amount')
    .setLabel('Bet Amount')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(input)
  );

  await interaction.showModal(modal);
}
