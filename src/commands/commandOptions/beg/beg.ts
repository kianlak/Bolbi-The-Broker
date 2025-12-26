import { Message } from 'discord.js';

import { logger } from '../../../shared/logger.ts';

import { UserService } from '../../../services/user/userService.ts';
import { milisecondsToMinutes } from '../../../helper/milisecondsToMinutes.ts';
import { calculateBegReward } from './calculateBegReward.ts';
import { BegService } from './services/begService.ts';
import { getMessageChannelName } from '../../../helper/getMessageChannelName.ts';
import { selectBegPrompts } from './selectBegPrompts.ts';

import type { CommandContext } from '../../types/types.ts';

const userService = new UserService();
const begService = new BegService(userService);

export async function beg({ message, user }: CommandContext) {
  const discodId = user.id;
  const discordUsername = user.username;
  const commandName = beg.name;
  
  logger.starting(`[${discordUsername}] Starting "${commandName}" in ${getMessageChannelName(message)}`)

  try {
    const { allowed, remainingMs } = userService.canBeg(discodId);
  
    if (!allowed) {
      await handleCannotBeg(message, remainingMs);
      return;
    }
  
    const reward = calculateBegReward();

    begService.begProfileUpdate(user, reward);
  
    const newBalance = userService.getBalanceByDiscordId(discodId);
  
    const prompt = selectBegPrompts(message.channelId);
  
    await message.reply(
      `*${prompt}*\n\n` +
      `You earned: \`${reward}\` baleh bucks 💲\n` + 
      `Your new balance is: \`${newBalance}\` 💰`
    );

    logger.success(`[${discordUsername}] Command "${commandName}" complete`);
  } catch (error) {
    logger.error(`[${discordUsername}] Command "${commandName}" failed with: `, error);
  }
  
  /* ───────────────────────── Helpers ───────────────────────── */

  async function handleCannotBeg(message: Message, remainingMs: number) {
    const minutes = milisecondsToMinutes(remainingMs);

    logger.warn(`[${discordUsername}] User has to wait ${minutes} minutes before begging again\n`);

    await message.reply(
      `You must wait \`${minutes} minutes\` before partaking in begging activities again`
    );
  }
}