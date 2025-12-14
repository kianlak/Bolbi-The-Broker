import { Message } from 'discord.js';
import { randomMessagePrompt } from '../helper/randomMessagePrompt.ts';
import { defaultResponsePrompts } from '../data/prompts/defaultResponsePrompts.ts';

export async function defaultResponse(message: Message) {
  const prompt = randomMessagePrompt(defaultResponsePrompts);

  console.log("default response");

  await message.reply(`*${prompt}*`);
}