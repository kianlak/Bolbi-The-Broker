import { Message } from 'discord.js';

import { buildCasinoEmbed } from './data/buildCasinoEmbed.ts';
import { buildCasinoMenu } from './data/buildCasinoMenu.ts';

export async function casino(message: Message) {
  await message.reply({
    embeds: [buildCasinoEmbed()],
    components: [buildCasinoMenu(message.author.id)],
  });
}
