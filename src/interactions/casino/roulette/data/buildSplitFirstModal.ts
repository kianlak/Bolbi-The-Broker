import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

export function buildSplitFirstNumberModal(ownerId: string) {
  const input = new TextInputBuilder()
    .setCustomId('first')
    .setLabel('First number (0–36 or 00)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  return new ModalBuilder()
    .setCustomId(`roulette:split-first:${ownerId}`)
    .setTitle('Split Bet – First Number')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(input)
    );
}
