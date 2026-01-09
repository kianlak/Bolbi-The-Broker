import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuInteraction,
  LabelBuilder,
} from 'discord.js';

export async function showSplitNumberModal(
  interaction: StringSelectMenuInteraction,
  ownerId: string,
  sessionId: string
) {
  const modal = new ModalBuilder()
    .setCustomId(
      `casino:roulette:split-number:${ownerId}:${sessionId}`
    )
    .setTitle('Split Bet');

  const numberInput = new TextInputBuilder()
    .setCustomId('number')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Enter a number between 1 and 36');

  const numberLabel = new LabelBuilder()
    .setLabel('Base Number')
    .setDescription(
      'Choose the number you want to split from'
    )
    .setTextInputComponent(numberInput);

  modal.addLabelComponents(numberLabel);

  await interaction.showModal(modal);
}
