import { AttachmentBuilder, Message } from 'discord.js';

import { logger } from '../../../shared/logger.ts';

import { UserService } from '../../../services/user/userService.ts';
import { milisecondsToMinutes } from '../../../helper/milisecondsToMinutes.ts';
import { calculateBegReward } from './calculateBegReward.ts';
import { BegService } from './services/begService.ts';
import { getMessageChannelName } from '../../../helper/getMessageChannelName.ts';
import { selectBegPrompts } from './selectBegPrompts.ts';
import { AchievementService } from '../../../services/achievement/achievementService.ts';

import type { CommandContext } from '../../types/CommandContext.ts';
import { ACHIEVEMENTS } from '../../../achievements/constant/ACHIEVEMENTS.ts';
import { getAchievementBadgePath } from '../../../achievements/getAchievementBadgePath.ts';
import { buildAchievementUnlockEmbed } from '../../../achievements/ui/buildAchievementUnlockEmbed.ts';

const userService = new UserService();
const begService = new BegService(userService);
const achievementService = new AchievementService();

export async function beg({ message, user }: CommandContext) {
  const discordId = user.id;
  const discordUsername = user.username;
  const commandName = beg.name;
  
  logger.starting(`[${discordUsername}] Starting "${commandName}" in ${getMessageChannelName(message)}`)

  try {
    const { allowed, remainingMs } = userService.canBeg(discordId);
  
    if (!allowed) {
      await handleCannotBeg(message, remainingMs);
      return;
    }

    const moneyFromBeg = calculateBegReward();

    begService.recordBegOnly(user);

    const upgradeResult = achievementService.checkAchievement(
      discordId,
      'master_beggar'
    );

    const begTier = achievementService.getTier(
      discordId,
      'master_beggar'
    );

    const multiplier = achievementService.getBegMultiplierFromTier(begTier);


    const reward = Math.ceil(multiplier * moneyFromBeg);

    begService.begProfileUpdate(user, reward);

    const newBalance = userService.getUserBalance(discordId);
  
    const prompt = selectBegPrompts(message.channelId);
  
    await message.reply(
      multiplier > 1 ?

      `*${prompt}*\n\n` +
      `You earned: \`${moneyFromBeg}\` baleh bucks 💲\n` +
      `With \`Master Beggar Tier ${begTier}\`, you made an extra \`${reward - moneyFromBeg}\` baleh bucks 🤑\n` + 
      `Your new balance is: \`${newBalance}\` 💰`
      
      :

      `*${prompt}*\n\n` +
      `You earned: \`${reward}\` baleh bucks 💲\n` + 
      `Your new balance is: \`${newBalance}\` 💰`
    );

    if (upgradeResult.upgraded) {
      const achievement = ACHIEVEMENTS.find(
        a => a.id === 'master_beggar'
      );

      if (achievement?.ui) {
        const badgePath = getAchievementBadgePath(
          achievement.ui.badgeBasePath,
          upgradeResult.newTier
        );

        const { embed, attachment } =
          buildAchievementUnlockEmbed({
            achievementName: achievement.name,
            tier: upgradeResult.newTier,
            description: achievement.description,
            badgePath,
          });

        await message.reply({
          embeds: [embed],
          files: [attachment],
        });
      }
    }

    logger.success(`[${discordUsername}] Command "${commandName}" complete`);
  } catch (error) {
    logger.error(`[${discordUsername}] Command "${commandName}" failed with: `, error);
  }
  
  async function handleCannotBeg(message: Message, remainingMs: number) {
    const minutes = milisecondsToMinutes(remainingMs);

    logger.warn(`[${discordUsername}] User has to wait ${minutes} minutes before begging again\n`);

    await message.reply(
      `You must wait \`${minutes} minutes\` before partaking in begging activities again`
    );
  }
}
