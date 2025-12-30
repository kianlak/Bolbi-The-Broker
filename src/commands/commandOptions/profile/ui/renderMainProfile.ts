import { EmbedBuilder } from 'discord.js';

import { BEG_COOLDOWN_MS } from '../../beg/constants/begConstants.ts';

import { milisecondsToMinutes } from '../../../../helper/milisecondsToMinutes.ts';

import type { ProfileContext } from '../types/ProfileContext.ts';
import type { MainProfileStats } from '../types/MainProfileStats.ts';

export function renderMainProfileEmbed(
  profileContext: ProfileContext,
  stats: MainProfileStats
) {
  const elapsed = Date.now() - stats.last_beg_at;
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
      { name: '💰 Baleh Bucks', value: `\`${stats.baleh_bucks}\`` },
      { name: '🙏 Beg Cooldown', value: cooldown },
      { name: '📈 Profit from Begging', value: `\`${stats.beg_profit}\`` },
      { name: '🔁 Times Begged', value: `\`${stats.number_of_begs}\`` }
    )
    .setFooter({ text: 'Kian Canes Metaverse Manager' })
    .setTimestamp();
}
