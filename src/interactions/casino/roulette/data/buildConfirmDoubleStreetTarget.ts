import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildConfirmDoubleStreetTarget(
  ownerId: string,
  target: string
) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(
        `roulette:wager-open:DOUBLE_STREET:${target}:${ownerId}`
      )
      .setLabel('💰 Enter Wager')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
