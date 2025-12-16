import { Message } from 'discord.js';

import { logger } from '../shared/logger.ts';

import { UserService } from '../helper/services/UserService/userService.ts';
import { randomMessagePrompt } from '../helper/randomMessagePrompt.ts';
import { begPrompts } from '../data/prompts/begPrompts.ts';
import { getDb } from '../database/sqlite.ts';
import { milisecondsToMinutes } from '../helper/milisecondsToMinutes.ts';

const userService = new UserService();

export async function beg(message: Message) {
  try {
    const userDiscordId = message.author.id;
  
    const { allowed, remainingMs } = userService.canBeg(userDiscordId);
  
    if (!allowed) {
      await handleCooldown(message, remainingMs);
      return;
    }
  
    const reward = calculateBegReward();
  
    applyBegTransaction(userDiscordId, reward);
  
    const newBalance = userService.getBalanceByDiscordId(userDiscordId);
  
    const prompt = randomMessagePrompt(begPrompts);
  
    await message.reply(
      `*${prompt}*\n` +
      `Your new balance is: \`${newBalance}\` 💰`
    );

    logger.success(message.author.username + "'s beg command complete");
  } catch (error) {
    logger.error(message.author.username + `'s beg command failed:\n\t${(error as Error).message}`);
  }

  async function handleCooldown(message: Message, remainingMs: number) {
    const minutes = milisecondsToMinutes(remainingMs);

    await message.reply(
      `You must wait \`${minutes} minutes\` before partaking in begging activities again`
    );
  }

  function calculateBegReward(): number {
    return Math.floor(Math.random() * 100);
  }

  function applyBegTransaction(userDiscordId: string, reward: number) {
    const db = getDb();

    const tx = db.transaction(() => {
      userService.addBalehBucks(userDiscordId, reward);
      userService.recordBeg(userDiscordId);
    });

    tx();
  }
}