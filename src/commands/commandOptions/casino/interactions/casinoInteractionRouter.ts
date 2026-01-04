import type { Interaction } from 'discord.js';

import { handleCasinoSelect } from './handleCasinoSelect.ts';
import { handleRouletteChooseBet } from '../games/roulette/interactions/handleRouletteChooseBet.ts';
import { handleRouletteChooseOption } from '../games/roulette/interactions/handleRouletteChooseOptions.ts';
import { handleRouletteSetAmount } from '../games/roulette/interactions/handleRouletteSetAmount.ts';

export async function ncasinoInteractionRouter(interaction: Interaction) {
  if (
    !interaction.isMessageComponent() &&
    !interaction.isModalSubmit()
  ) return;

  const [scope, area, action] = interaction.customId.split(':');

  if (scope !== 'ncasino') return;  

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

      if (action === 'set-amount' && interaction.isModalSubmit()) {
        return handleRouletteSetAmount(interaction);
      }

      break;
  }
}
