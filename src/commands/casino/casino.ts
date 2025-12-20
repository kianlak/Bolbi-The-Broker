import { Message } from 'discord.js';

import { buildCasinoEmbed } from './data/buildCasinoEmbed.ts';
import { buildCasinoMenu } from './data/buildCasinoMenu.ts';
import { deleteSession } from '../../interactions/casino/roulette/rouletteSession.ts';

export async function casino(message: Message) {
  deleteSession(message.author.id);
  
  await message.reply({
    embeds: [buildCasinoEmbed()],
    components: [buildCasinoMenu(message.author.id)],
  });
}
