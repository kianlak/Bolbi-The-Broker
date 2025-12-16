import { Message } from 'discord.js';

import { logger } from '../shared/logger.ts';

import { UserService } from '../helper/services/UserService/userService.ts';
import { randomMessagePrompt } from '../helper/randomMessagePrompt.ts';
import { begPrompts } from '../data/prompts/begPrompts.ts';
import { getDb } from '../database/sqlite.ts';

const userService = new UserService();

export async function beg(message: Message) {
  try {
    const userDiscordId = message.author.id;
  
    const { allowed, remainingMs } = userService.canBeg(userDiscordId);
  
    if (!allowed) {
      const minutes = Math.ceil(remainingMs / 60000);
  
      await message.reply(
        `You must wait \`${minutes} minutes\` before partaking in begging activities again`
      );
  
      return;
    }
  
    const reward = Math.floor(Math.random() * 100) + 0;
  
    const db = getDb();
    
    const tx = db.transaction(() => {
      userService.addBalehBucks(userDiscordId, reward);
      userService.recordBeg(userDiscordId);
    });
  
    tx();
  
    const newBalance = userService.getBalance(userDiscordId);
  
    const prompt = randomMessagePrompt(begPrompts);
  
    await message.reply(
      `*${prompt}*\n` +
      `Your new balance is: \`${newBalance}\` 💰`
    );

    logger.success(message.author.username + "'s beg command complete");
  } catch (error) {
    logger.error(message.author.username + `'s beg command failed:\n\t${(error as Error).message}`);
  }
}