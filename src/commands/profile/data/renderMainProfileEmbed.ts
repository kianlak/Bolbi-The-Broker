import { EmbedBuilder } from 'discord.js';
import type { ProfileContext } from '../types/ProfileContext.ts';
import { milisecondsToMinutes } from '../../../helper/milisecondsToMinutes.ts';
import { BEG_COOLDOWN_MS } from '../../../data/constants.ts';


export function renderMainProfileEmbed(
  ctx: ProfileContext,
  user: any
) {
  const now = Date.now();

  const cooldownMinutes = user.last_beg_at
    ? milisecondsToMinutes(
        BEG_COOLDOWN_MS - (now - user.last_beg_at)
      )
    : 0;

  const begReadyStatus =
    cooldownMinutes <= 0
      ? '`Ready`'
      : `\`${cooldownMinutes} minutes\``;

  return new EmbedBuilder()
    .setColor(0xf1c40f)
    .setAuthor({
      name: `${ctx.username}'s Profile`,
      iconURL: ctx.avatarUrl,
    })
    .setThumbnail(ctx.avatarUrl)
    .addFields(
      {
        name: '💰 Baleh Bucks',
        value: `\`${user.baleh_bucks}\``,
      },
      {
        name: '🙏 Beg Cooldown',
        value: begReadyStatus,
      },
      {
        name: '📈 Profit from Begging',
        value: `\`${user.beg_profit}\``,
      },
      {
        name: '🔁 Times Begged',
        value: `\`${user.number_of_begs}\``,
      }
    )
    .setFooter({ text: 'Bolbi The Broker' })
    .setTimestamp();
}
