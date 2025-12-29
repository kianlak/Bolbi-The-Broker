import { EmbedBuilder } from 'discord.js';

import { BEG_COOLDOWN_MS } from '../../beg/constants/begConstants.ts';

import { milisecondsToMinutes } from '../../../../helper/milisecondsToMinutes.ts';

import type { ProfileContext } from '../types/ProfileContext.ts';

export function renderMainProfileEmbed(
  profileContext: ProfileContext,
  user: {
    baleh_bucks: number;
    last_beg_at: number;
    beg_profit: number;
    number_of_begs: number;
  }
) {
  const elapsed = Date.now() - user.last_beg_at;
  const remaining = BEG_COOLDOWN_MS - elapsed;

  const cooldown =
    remaining <= 0
      ? '`Ready`'
      : `\`${milisecondsToMinutes(remaining)} minutes\``;

  return new EmbedBuilder()
    .setColor(0xf1c40f)
    .setAuthor({
      name: `${profileContext.user.username}'s Profile`,
      iconURL: profileContext.avatarUrl,
    })
    .setThumbnail(profileContext.avatarUrl)
    .addFields(
      { name: '💰 Baleh Bucks', value: `\`${user.baleh_bucks}\`` },
      { name: '🙏 Beg Cooldown', value: cooldown },
      { name: '📈 Profit from Begging', value: `\`${user.beg_profit}\`` },
      { name: '🔁 Times Begged', value: `\`${user.number_of_begs}\`` }
    )
    .setFooter({ text: 'Bolbi The Broker' })
    .setTimestamp();
}
