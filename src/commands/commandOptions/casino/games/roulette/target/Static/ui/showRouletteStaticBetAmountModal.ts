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

import type { RouletteBetCategory } from '../../../types/RouletteBetCategory.ts';

export async function showRouletteStaticBetAmountModal(
  interaction: StringSelectMenuInteraction,
  category: RouletteBetCategory,
  label: string,
  ownerId: string,
  sessionId: string
) {
  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;

  const modal = new ModalBuilder()
    .setCustomId(
      `casino:roulette:set-static-amount:${category}:${ownerId}:${sessionId}`
    )
    .setTitle(`${label} Bet`);

  const balanceDisplay = new TextDisplayBuilder()
    .setContent(`💰 **Available Baleh Bucks:** $${available}`);

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
