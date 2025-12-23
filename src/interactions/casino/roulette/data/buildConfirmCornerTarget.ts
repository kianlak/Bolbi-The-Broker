import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildConfirmCornerTarget(
  ownerId: string,
  target: string
) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(
        `roulette:wager-open:CORNER:${target}:${ownerId}`
      )
      .setLabel('💰 Enter Wager')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
