import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { ROULETTE_BET_CATEGORIES } from '../constants/ROULETTE_BET_CATEOGIRES.ts';

import { UserService } from '../../../../../../services/user/userService.ts';
import { getRouletteState } from '../rouletteSessionStore.ts';

export function buildRouletteBetCategoryMenu(
  ownerId: string,
  ownerUsername: string,
  sessionId: string,
  disabled = false
) {
  const enabledCategories = ROULETTE_BET_CATEGORIES.filter(
    category => category.enabled
  );

  const userService = new UserService();
  const balance = userService.getUserBalance(ownerId);
  const state = getRouletteState(sessionId);

  const available = balance - state.reserved;
  disabled = available > 0 ? false : true;

  const menu = new StringSelectMenuBuilder()
    .setCustomId(`casino:roulette:choose-bet:${ownerId}:${sessionId}`)
    .setPlaceholder(`Add a bet`)
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
