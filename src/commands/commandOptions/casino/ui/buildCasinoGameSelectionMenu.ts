import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { CASINO_GAMES } from '../constants/CASINO_GAMES.ts';

export function buildCasinoGameSelectionMenu(ownerId: string, sessionId: string) {
  const menu = new StringSelectMenuBuilder()
    .setCustomId(`casino:lobby:select:${ownerId}:${sessionId}`)
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
