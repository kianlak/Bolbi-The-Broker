import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonInteraction,
  LabelBuilder,
} from 'discord.js';

import { formatRouletteNumber } from '../../../helper/formatRouletteNumber.ts';

export async function showSplitAmountModal(
  interaction: ButtonInteraction,
  ownerId: string,
  sessionId: string,
  base: string,
  option: string
) {
  const modal = new ModalBuilder()
    .setCustomId(
      `casino:roulette:set-split-amount:${ownerId}:${sessionId}:${base}:${option}`
    )
    .setTitle(
      `Split ${formatRouletteNumber(Number(base))} / ${formatRouletteNumber(Number(option))}`
    );

  const amountInput = new TextInputBuilder()
    .setCustomId('amount')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Enter bet amount');

  const amountLabel = new LabelBuilder()
    .setLabel('Bet Amount')
    .setDescription('How much would you like to wager?')
    .setTextInputComponent(amountInput);

  modal.addLabelComponents(amountLabel);

  await interaction.showModal(modal);
}
