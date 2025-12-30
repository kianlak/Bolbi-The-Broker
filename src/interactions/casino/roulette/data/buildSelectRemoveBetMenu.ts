import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import type { RouletteSession } from '../rouletteSession.ts';

export function buildRemoveBetMenu(
  session: RouletteSession,
  ownerId: string
) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(`roulette:remove-select:${ownerId}`)
    .setPlaceholder('Select a bet to remove')
    .addOptions(
      session.bets.map((bet, index) => ({
        label: `${bet.category} → ${bet.target}`,
        description: `$${bet.amount}`,
        value: String(index),
      }))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(menu);
}
