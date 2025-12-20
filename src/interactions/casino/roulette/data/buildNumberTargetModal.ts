import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

export function buildNumberTargetModal(ownerId: string) {
  const input = new TextInputBuilder()
    .setCustomId('number')
    .setLabel('Enter a number (0-36 or 00)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  return new ModalBuilder()
    .setCustomId(`roulette:number-input:${ownerId}`)
    .setTitle('Choose a Number')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(input)
    );
}
