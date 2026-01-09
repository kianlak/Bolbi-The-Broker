import type { Interaction } from 'discord.js';

import { handleCasinoSelect } from './handleCasinoSelect.ts';
import { handleRouletteChooseBet } from '../games/roulette/interactions/handleRouletteChooseBet.ts';
import { handleRouletteChooseOption } from '../games/roulette/interactions/handleRouletteChooseOptions.ts';
import { handleRouletteSetAmount } from '../games/roulette/interactions/handleRouletteSetAmount.ts';
import { handleRouletteSetNumberAmount } from '../games/roulette/target/Number/handleRouletteSetNumberAmount.ts';
import { handleRouletteSpin } from '../games/roulette/interactions/handleRouletteSpin.ts';
import { handleRouletteNewRound } from '../games/roulette/interactions/handleRouletteNewRound.ts';
import { handleSplitChoice } from '../games/roulette/target/Split/handleSplitChoice.ts';
import { handleSplitNumberSubmit } from '../games/roulette/target/Split/handleSplitNumberSubmit.ts';
import { handleSplitOption } from '../games/roulette/target/Split/handleSplitOption.ts';
import { handleSplitAmountSubmit } from '../games/roulette/target/Split/handleSplitAmountSubmit.ts';
import { handleRouletteRemoveBet } from '../games/roulette/interactions/handleRouletteRemoveBet.ts';
import { handleRouletteRemoveBetSelect } from '../games/roulette/interactions/handleRouletteRemoveBetSelect.ts';
import { handleRouletteSetRowAmount } from '../games/roulette/target/Static/handleRouletteSetRowAmount.ts';
import { handleRouletteChooseDropdown } from '../games/roulette/target/Dropdown/handleRouletteDropdown.ts';

export async function casinoInteractionRouter(interaction: Interaction) {
  if (
    !interaction.isMessageComponent() &&
    !interaction.isModalSubmit()
  ) return;

  const [scope, area, action] = interaction.customId.split(':');

  if (scope !== 'casino') return;  

  switch (area) {
    case 'lobby':
      if (action === 'select' && interaction.isStringSelectMenu()) {
        return handleCasinoSelect(interaction);
      }
      break;

    case 'roulette':
      if (action === 'choose-bet' && interaction.isStringSelectMenu()) {
        return handleRouletteChooseBet(interaction);
      }

      if (action === 'choose-option' && interaction.isButton()) {
        return handleRouletteChooseOption(interaction);
      }

      if (action === 'set-number-amount' && interaction.isModalSubmit()) {
        return handleRouletteSetNumberAmount(interaction);
      }

      if (action === 'split-number' && interaction.isModalSubmit()) {
         return handleSplitNumberSubmit(interaction);
      }

      if (action === 'split-choice' && interaction.isButton()) {
        return handleSplitChoice(interaction);
      }

      if (action === 'split-option' && interaction.isButton()) {
        return handleSplitOption(interaction);
      }

      if (action === 'set-split-amount' && interaction.isModalSubmit()) {
        return handleSplitAmountSubmit(interaction);
      }

      if (action === 'set-static-amount' && interaction.isModalSubmit()) {
        return handleRouletteSetRowAmount(interaction);
      }

      if (action === 'choose-dropdown' && interaction.isStringSelectMenu()) {
        return handleRouletteChooseDropdown(interaction);
      }

      if (action === 'set-amount' && interaction.isModalSubmit()) {
        return handleRouletteSetAmount(interaction);
      }

      if (action === 'spin' && interaction.isButton()) {
        return handleRouletteSpin(interaction);
      }

      if (action === 'new-round' && interaction.isButton()) {
        return handleRouletteNewRound(interaction);
      }

      if (action === 'remove-bet' && interaction.isButton()) {
        return handleRouletteRemoveBet(interaction);
      }

      if (action === 'remove-bet-select' && interaction.isStringSelectMenu()) {
        return handleRouletteRemoveBetSelect(interaction);
      }

      break;
  }
}
