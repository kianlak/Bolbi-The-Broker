import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

export function buildSpinButton(ownerId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId(`roulette:spin:${ownerId}`)
      .setLabel('🎲 Spin')
      .setStyle(ButtonStyle.Success)
  );
}
