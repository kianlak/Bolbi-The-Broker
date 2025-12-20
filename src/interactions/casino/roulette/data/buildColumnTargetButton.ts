import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildColumnTargetButtons(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:target:COLUMN:COLUMN_1:${ownerId}`)
      .setLabel('Column 1')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:target:COLUMN:COLUMN_2:${ownerId}`)
      .setLabel('Column 2')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:target:COLUMN:COLUMN_3:${ownerId}`)
      .setLabel('Column 3')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
