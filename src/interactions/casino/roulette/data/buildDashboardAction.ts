import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildDashboardActions(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:remove-bet:${ownerId}`)
      .setLabel('Remove Bet')
      .setStyle(ButtonStyle.Danger)
  );
}
