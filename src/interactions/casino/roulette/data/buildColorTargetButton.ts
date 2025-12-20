import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildColorTargetButtons(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:target:COLOR:RED:${ownerId}`)
      .setLabel('Red')
      .setStyle(ButtonStyle.Danger),

    new ButtonBuilder()
      .setCustomId(`roulette:target:COLOR:BLACK:${ownerId}`)
      .setLabel('Black')
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
