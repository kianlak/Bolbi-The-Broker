import {
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

export async function casino(message: Message) {
  const embed = new EmbedBuilder()
    .setTitle('🎲 Bolbi\'s Casino')
    .setDescription(
      'Welcome to the casino!\n\n' +
      'Select a game from the menu below.'
    )
    .setColor(0x9b59b6)
    .setFooter({ text: 'More games coming soon' });

  const menu = new StringSelectMenuBuilder()
    .setCustomId('casino:select')
    .setPlaceholder('Choose a casino game')
    .addOptions([
      {
        label: 'Roulette',
        description: 'Bet on red or black',
        value: 'roulette',
        emoji: '🎰',
      },
    ]);

  const row = new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(menu);

  await message.reply({
    embeds: [embed],
    components: [row],
  });
}
