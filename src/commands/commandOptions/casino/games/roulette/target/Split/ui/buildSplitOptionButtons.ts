import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

import { formatRouletteNumber } from '../../../helper/formatRouletteNumber.ts';

export function buildSplitOptionButtons(
  base: number,
  options: number[],
  ownerId: string,
  sessionId: string
) {
  const buttons = options.map(option =>
    new ButtonBuilder()
      .setCustomId(
        `casino:roulette:split-option:${ownerId}:${sessionId}:${base}:${option}`
      )
      .setLabel(`${formatRouletteNumber(base)} & ${formatRouletteNumber(option)}`)
      .setStyle(ButtonStyle.Primary)
  );

  return [
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      buttons.slice(0, 5)
    ),
  ];
}
