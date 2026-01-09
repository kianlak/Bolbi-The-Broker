import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { getDropdownOptions } from '../dropdownOptionsProvider.ts';

import type { RouletteBetCategory } from '../../../types/RouletteBetCategory.ts';

export function buildDropdownTargetMenu(
  category: RouletteBetCategory,
  ownerId: string,
  sessionId: string
) {
  const options = getDropdownOptions(category);

  const menu = new StringSelectMenuBuilder()
    .setCustomId(
      `casino:roulette:choose-dropdown:${category}:${ownerId}:${sessionId}`
    )
    .setPlaceholder('Choose a bet option')
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions(
      options.map(o => ({
        label: o.label,
        value: o.value,
      }))
    );

  return [
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(menu),
  ];
}
