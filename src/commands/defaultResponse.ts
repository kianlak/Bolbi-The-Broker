import { Message } from 'discord.js';

import { logger } from '../shared/logger.ts';

import { randomMessagePrompt } from '../helper/randomMessagePrompt.ts';
import { defaultResponsePrompts } from '../data/prompts/defaultResponsePrompts.ts';

export async function defaultResponse(message: Message) {
  try {
    const prompt = randomMessagePrompt(defaultResponsePrompts);

    await message.reply(`*${prompt}*`);

    logger.success("Default Response sent to " + message.author.username);
  } catch (error) {
    logger.error(message.author.username + `'s Default Response failed:\n\t${(error as Error).message}`);
  }
}