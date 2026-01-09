import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuInteraction,
  LabelBuilder,
  TextDisplayBuilder,
} from 'discord.js';

import { UserService } from '../../../../../../../../services/user/userService.ts';
import { getRouletteState } from '../../../rouletteSessionStore.ts';

export async function showRouletteNumberModal(
  interaction: StringSelectMenuInteraction,
  ownerId: string,
  sessionId: string
) {
  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;


  const modal = new ModalBuilder()
    .setCustomId(
      `casino:roulette:set-number-amount:${ownerId}:${sessionId}`
    )
    .setTitle('Single Number Bet');

  const numberInput = new TextInputBuilder()
    .setCustomId('number')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Example: 7 or 00');

  const numberLabel = new LabelBuilder()
    .setLabel('Choose a number (0-36 or 00)')
    .setDescription('Pick the exact number you want to bet on')
    .setTextInputComponent(numberInput);

  const amountInput = new TextInputBuilder()
    .setCustomId('amount')
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setPlaceholder('Enter bet amount');
  
  const balanceDisplay = new TextDisplayBuilder()
    .setContent(`💰 **Available Baleh Bucks:** $${available}`);

  const amountLabel = new LabelBuilder()
    .setLabel('Bet Amount')
    .setDescription('How much would you like to wager?')
    .setTextInputComponent(amountInput);
  
  modal.addTextDisplayComponents(balanceDisplay);
  modal.addLabelComponents(numberLabel, amountLabel);

  await interaction.showModal(modal);
}
