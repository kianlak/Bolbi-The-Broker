import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildNewRoundAction(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:new-round:${ownerId}`)
      .setLabel('🔁 New Round')
      .setStyle(ButtonStyle.Primary)
  );
}
