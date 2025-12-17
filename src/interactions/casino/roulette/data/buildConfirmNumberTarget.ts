import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildConfirmNumberTarget(
  ownerId: string,
  value: number
) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(
        `roulette:wager-open:NUMBER:${value}:${ownerId}`
      )
      .setLabel(`Enter wager for ${value === 37 ? '00' : value}`)
      .setStyle(ButtonStyle.Primary)
  );
}
