import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildNewRoundButtonRow(
  ownerId: string
) {
  const button = new ButtonBuilder()
    .setCustomId(`casino:roulette:new-round:${ownerId}`)
    .setLabel('New Round')
    .setEmoji('🔁')
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    button
  );
}
