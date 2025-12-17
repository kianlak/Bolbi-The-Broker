import type { Interaction } from 'discord.js';

import { handleAddBet } from './handleAddBet.ts';
import { handleTargetSelect } from './handleTargetSelect.ts';
import { handleWagerSubmit } from './handleRouletteWagerSubmit.ts';
import { handleRemoveBet } from './handleRemoveBet.ts';
import { handleRemoveBetSelect } from './handleRemoveBetSelect.ts';
import { handleOpenWagerModal } from './handleOpenWagerModal.ts';
import { handleNumberInput } from './handleNumberInput.ts';
import { handleSpin } from './handleSpin.ts';
import { handleNewRound } from './handleNewRound.ts';
import { handleExit } from './handleExit.ts';

export async function rouletteInteractionRouter(
  interaction: Interaction
) {
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

  switch (action) {
    case 'add-bet':
      if (interaction.isStringSelectMenu())
        await handleAddBet(interaction);
      return;

    case 'target':
      if (interaction.isButton())
        await handleTargetSelect(interaction);
      return;

    case 'number-input':
      if (interaction.isModalSubmit()) {
        await handleNumberInput(interaction);
      }
      return;
    
    case 'wager':
      if (interaction.isModalSubmit()) {
        await handleWagerSubmit(interaction);
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
