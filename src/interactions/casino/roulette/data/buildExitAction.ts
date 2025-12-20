import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildExitAction(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:exit:${ownerId}`)
      .setLabel('🚪 Exit')
      .setStyle(ButtonStyle.Secondary)
  );
}
