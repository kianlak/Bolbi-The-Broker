import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildEvenOddTargetButtons(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:target:EVEN_ODD:EVEN:${ownerId}`)
      .setLabel('Even')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:target:EVEN_ODD:ODD:${ownerId}`)
      .setLabel('Odd')
      .setStyle(ButtonStyle.Primary),
  );
}
