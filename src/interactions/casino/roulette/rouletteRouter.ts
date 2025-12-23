import type { Interaction } from 'discord.js';

import { handleAddBet } from './handler/handleAddBet.ts';
import { handleTargetSelect } from './handler/handleTargetSelect.ts';
import { handleRemoveBet } from './handler/handleRemoveBet.ts';
import { handleRemoveBetSelect } from './handler/handleRemoveBetSelect.ts';
import { handleOpenWagerModal } from './handler/handleOpenWagerModal.ts';
import { handleNumberInput } from './handler/handleNumberInput.ts';
import { handleSpin } from './handler/handleSpin.ts';
import { handleNewRound } from './handler/handleNewRound.ts';
import { handleExit } from './handler/handleExit.ts';
import { handleRouletteWagerSubmit } from './handler/handleRouletteWagerSubmit.ts';
import { handleDoubleStreetTargetSelect } from './handler/handleDoubleStreetTargetSelect.ts';
import { handleStreetTargetSelect } from './handler/handleStreetTargetSelect.ts';
import { handleCornerTargetSelect } from './handler/handleCornerTargetSelect.ts';
import { handleSplitFirstInput } from './handler/handleSplitFirstInput.ts';
import { handleSplitSecondSelect } from './handler/handleSplitSecondSelect.ts';

export async function rouletteInteractionRouter(interaction: Interaction) {
  if (!interaction.isMessageComponent() && !interaction.isModalSubmit()) {
    return;
  }

  const parts = interaction.customId.split(':');
  const ownerId = parts.at(-1);
  
  if (interaction.user.id !== ownerId) {
    await interaction.reply({
      content: '🚫 This roulette session is not yours.',
      ephemeral: true,
    });
    return;
  }
  
  const action = parts[1];
  const category = parts[2];

  switch (action) {
    case 'add-bet':
      if (interaction.isStringSelectMenu())
        await handleAddBet(interaction);
      return;

    case 'target':
      if (interaction.isButton())
        await handleTargetSelect(interaction);
      if (interaction.isStringSelectMenu() && category === 'DOUBLE_STREET') {
        await handleDoubleStreetTargetSelect(interaction);
      }
      else if (interaction.isStringSelectMenu() && category === 'STREET') {
        await handleStreetTargetSelect(interaction);
      }
      else if (interaction.isStringSelectMenu() && category === 'CORNER') {
        await handleCornerTargetSelect(interaction);
      }
      return;

    case 'split-first':
      if (interaction.isModalSubmit()) {
        await handleSplitFirstInput(interaction);
      }
      return;

    case 'split-second':
      if (interaction.isButton()) {
        await handleSplitSecondSelect(interaction);
      }
      return;

    case 'number-input':
      if (interaction.isModalSubmit()) {
        await handleNumberInput(interaction);
      }
      return;
    
    case 'wager':
      if (interaction.isModalSubmit()) {
        await handleRouletteWagerSubmit(interaction);
      }
      return;
      
    case 'wager-open':
      if (interaction.isButton()) {
        await handleOpenWagerModal(interaction);
      }
      return;
    
    case 'remove-bet':
      if (interaction.isButton()) {
        await handleRemoveBet(interaction);
      }
      return;

    case 'remove-select':
      if (interaction.isStringSelectMenu()) {
        await handleRemoveBetSelect(interaction);
      }
      return;

    case 'spin':
      if (interaction.isButton()) {
        await handleSpin(interaction);
      }
      return;

    case 'new-round':
      if (interaction.isButton()) {
        await handleNewRound(interaction);
      }
      return;

    case 'exit':
      if (interaction.isButton()) {
        await handleExit(interaction);
      }
      return;
      
    default:
      return;
  }
}
