import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildRouletteActionRow(
  ownerId: string,
  sessionId: string,
  options?: {
    disableSpin?: boolean;
    disableRemove?: boolean;
  }
) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`casino:roulette:spin:${ownerId}:${sessionId}`)
      .setLabel('Spin')
      .setEmoji('🎲')
      .setStyle(ButtonStyle.Success)
      .setDisabled(options?.disableSpin ?? false),

    new ButtonBuilder()
      .setCustomId(`casino:roulette:remove-bet:${ownerId}:${sessionId}`)
      .setLabel('Remove Bet')
      .setEmoji('🗑️')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(options?.disableRemove ?? false),
  );
}
