import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildLowHighTargetButtons(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:target:LOW_HIGH:LOW:${ownerId}`)
      .setLabel('1 to 18')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:target:LOW_HIGH:HIGH:${ownerId}`)
      .setLabel('19 to 36')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
