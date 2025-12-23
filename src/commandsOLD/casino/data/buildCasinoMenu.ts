import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { CASINO_GAMES } from '../../../data/constants/constants.ts';

export function buildCasinoMenu(ownerId: string) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(`casino:select:${ownerId}`)
    .setPlaceholder('Select a casino game')
    .addOptions(
      CASINO_GAMES.map(game => ({
        label: game.label,
        description: game.description,
        value: game.id,
        emoji: game.emoji,
      }))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(menu);
}
