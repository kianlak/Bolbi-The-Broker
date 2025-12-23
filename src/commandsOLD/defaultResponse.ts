import { Message } from 'discord.js';

import { logger } from '../shared/logger.ts';

import { randomMessagePrompt } from '../helper/randomMessagePrompt.ts';
import { defaultResponsePrompts } from '../data/prompts/defaultResponsePrompts.ts';

export async function defaultResponse(message: Message) {
  try {
    const prompt = randomMessagePrompt(defaultResponsePrompts);

    await message.reply(`*${prompt}*`);

    logger.success(message.author.username + "'s default response command complete");
  } catch (error) {
    logger.error(message.author.username + `'s default response command failed:\n\t${(error as Error).message}`);
  }
}