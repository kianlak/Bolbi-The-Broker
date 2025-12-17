import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';

export function buildWagerAmountModal(
  ownerId: string,
  category: string,
  target: string
) {
  const input = new TextInputBuilder()
    .setCustomId('amount')
    .setLabel('Enter wager amount')
    .setPlaceholder('e.g. 25')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  return new ModalBuilder()
    .setCustomId(`roulette:wager:${category}:${target}:${ownerId}`)
    .setTitle('Place Your Bet')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(input)
    );
}
