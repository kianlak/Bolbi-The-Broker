import { AttachmentBuilder, Message } from 'discord.js';

import { buildCasinoEmbed } from './data/buildCasinoEmbed.ts';
import { buildCasinoMenu } from './data/buildCasinoMenu.ts';
import { deleteSession } from '../../interactions/casino/roulette/rouletteSession.ts';
import type { CommandContext } from '../../commands/types/CommandContext.ts';

export async function casino({ message, args }: CommandContext) {
  const casinoEntranceImage = new AttachmentBuilder('./src/data/img/casinoEntrance.png');

  deleteSession(message.author.id);
  
  await message.reply({
    embeds: [buildCasinoEmbed()],
    components: [buildCasinoMenu(message.author.id)],
    files: [casinoEntranceImage],
  });
}
