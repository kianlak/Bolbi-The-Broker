import { EmbedBuilder, Message } from 'discord.js';

import { BEG_COOLDOWN_MS } from '../data/constants.ts';

import { logger } from '../shared/logger.ts';

import { UserService } from '../helper/services/UserService/userService.ts';
import { milisecondsToMinutes } from '../helper/milisecondsToMinutes.ts';

const userService = new UserService();

export async function profile(message: Message) {
  try {
    const now = Date.now();
    const userDiscordId = message.author.id;
    const user = userService.getUserByDiscordId(userDiscordId);
    const cooldown = user.last_beg_at ? milisecondsToMinutes(BEG_COOLDOWN_MS - (now -user.last_beg_at)) : 0;
    const begReadyStatus = cooldown != 0 ? `\`${cooldown} minutes\`` : '\`Ready\`'

    const embed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setAuthor({
        name: `${message.author.username}'s Profile`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setThumbnail(message.author.displayAvatarURL())
      .addFields(
        {
          name: '💰 Baleh Bucks',
          value: `\`${user.baleh_bucks}\``,
        },
        {
          name: '🙏 Beg Cooldown',
          value: `${begReadyStatus}`,
        }
      )
      .setFooter({ text: 'Bolbi The Broker' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });

    logger.success(message.author.username + "'s profile command complete");
  } catch (error) {
    logger.error(message.author.username + `'s profile command failed:\n\t${(error as Error).message}`);
  }
}