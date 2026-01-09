import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

import { FIXED_TARGET_OPTIONS } from '../fixedTargetOptions.ts';

import type { RouletteBetCategory } from '../../../types/RouletteBetCategory.ts';

export function buildFixedChoiceButtons(
  category: RouletteBetCategory,
  ownerId: string,
  sessionId: string
) {
  const options = FIXED_TARGET_OPTIONS[category];
  if (!options) return [];

  const buttons = options.map(opt => {
    const button = new ButtonBuilder()
      .setCustomId(
        `casino:roulette:choose-option:${ownerId}:${sessionId}:${category}:${opt.value}`
      )
      .setLabel(opt.label)
      .setStyle(ButtonStyle.Primary);

    if (opt.emoji) button.setEmoji(opt.emoji);
    return button;
  });

  return [
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      buttons.slice(0, 5)
    ),
  ];
}
