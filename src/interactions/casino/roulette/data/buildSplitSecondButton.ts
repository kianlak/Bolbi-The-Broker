import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { getValidSplitPartners } from '../engine/getValidSplitPatterns.ts';


export function buildSplitSecondButtons(
  first: number,
  ownerId: string
) {
  const partners = getValidSplitPartners(first);

  const rows: ActionRowBuilder<ButtonBuilder>[] = [];
  let currentRow = new ActionRowBuilder<ButtonBuilder>();

  for (const second of partners) {
    if (currentRow.components.length === 5) {
      rows.push(currentRow);
      currentRow = new ActionRowBuilder<ButtonBuilder>();
    }

    currentRow.addComponents(
      new ButtonBuilder()
        .setCustomId(
          `roulette:split-second:${first}:${second}:${ownerId}`
        )
        .setLabel(second === 37 ? '00' : String(second))
        .setStyle(ButtonStyle.Primary)
    );
  }

  if (first !== 2) {
    currentRow.addComponents(
      new ButtonBuilder()
        .setCustomId(`roulette:exit:${ownerId}`)
        .setLabel('🚪 Exit')
        .setStyle(ButtonStyle.Secondary)
    );
  }

  rows.push(currentRow);
  return rows;
}
