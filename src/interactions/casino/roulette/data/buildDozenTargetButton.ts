import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildDozenTargetButtons(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:target:DOZEN:DOZEN_1:${ownerId}`)
      .setLabel('1st 12')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:target:DOZEN:DOZEN_2:${ownerId}`)
      .setLabel('2nd 12')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:target:DOZEN:DOZEN_3:${ownerId}`)
      .setLabel('3rd 12')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
