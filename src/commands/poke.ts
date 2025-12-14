import { Message } from 'discord.js';

export async function poke(message: Message) {
  await message.reply('Bolbi wakes up');
}
