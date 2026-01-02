import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { ROULETTE_BET_CATEGORIES } from '../constants/ROULETTE_BET_CATEOGIRES.ts';

export function buildRouletteBetCategoryMenu(
  ownerId: string,
  sessionId: string,
  disabled = false
) {
  const enabledCategories = ROULETTE_BET_CATEGORIES.filter(
    category => category.enabled
  );

  const menu = new StringSelectMenuBuilder()
    .setCustomId(`ncasino:roulette:choose-bet:${ownerId}:${sessionId}`)
    .setPlaceholder('Choose a bet type')
    .setMinValues(1)
    .setMaxValues(1)
    .setDisabled(disabled)
    .addOptions(
      enabledCategories.map(category => ({
        label: category.label,
        description: category.description,
        value: category.category,
        emoji: category.emoji,
      }))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(menu);
}
