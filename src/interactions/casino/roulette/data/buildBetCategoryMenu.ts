import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';
import { ROULETTE_BET_CATEGORIES } from '../betCategories.ts';

export function buildBetCategoryMenu(ownerId: string) {
  const enabledCategories = ROULETTE_BET_CATEGORIES.filter(
    c => c.enabled
  );

  const menu = new StringSelectMenuBuilder()
    .setCustomId(`roulette:add-bet:${ownerId}`)
    .setPlaceholder('Choose a bet type')
    .addOptions(
      enabledCategories.map(category => ({
        label: category.label,
        description: category.description,
        value: category.category,
      }))
    );

  return new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(menu);
}
