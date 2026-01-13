import { EmbedBuilder } from 'discord.js';

import type { ProfileContext } from '../types/ProfileContext.ts';
import type { RouletteProfileStats } from '../types/RouletteProfileStats.ts';
import type { RouletteBetWinRates } from '../types/RouletteBetWinRates.ts';

export function buildRouletteStatsProfileEmbed(
  profileContext: ProfileContext,
  stats: RouletteProfileStats | null,
  rates: RouletteBetWinRates
) {
  if (!stats) {
    return new EmbedBuilder()
      .setColor(0xe74c3c)
      .setAuthor({
        name: `${profileContext.user.username}'s Roulette Stats`,
        iconURL: profileContext.avatarUrl,
      })
      .setDescription(
        '🎰 No roulette data yet.\nPlay roulette to start tracking stats.'
      )
      .setThumbnail(profileContext.avatarUrl)
      .setFooter({ text: 'Kian Canes Metaverse Manager' })
      .setTimestamp();
  }

  const totalBets = stats.bets_won + stats.bets_lost;
  const winRate =
    totalBets === 0
      ? '0%'
      : `${Math.round((stats.bets_won / totalBets) * 100)}%`;

  const netProfit =
    stats.baleh_bucks_won - stats.baleh_bucks_lost;

  return new EmbedBuilder()
    .setColor(0xe74c3c)
    .setAuthor({
      name: `${profileContext.user.username}'s Roulette Stats`,
      iconURL: profileContext.avatarUrl,
    })
    .setThumbnail(profileContext.avatarUrl)
    .addFields(
      {
        name: '🎯 Spins Played',
        value: `\`${stats.spins_played}\``,
        inline: true,
      },
      {
        name: '🏆 Win Rate',
        value: `\`${winRate}\``,
        inline: true,
      },
      {
        name: '💰 Net Profit',
        value: `\`${netProfit}\``,
        inline: true,
      },
      {
        name: '📈 Total Won',
        value: `\`${stats.baleh_bucks_won}\``,
        inline: true,
      },
      {
        name: '📉 Total Lost',
        value: `\`${stats.baleh_bucks_lost}\``,
        inline: true,
      },
      {
        name: '🔥 Biggest Win',
        value: `\`${stats.largest_win}\``,
        inline: true,
      },
      {
        name: '💀 Biggest Loss',
        value: `\`${stats.largest_loss}\``,
        inline: true,
      },
      {
        name: '✅ Winning Bets',
        value: `\`${stats.bets_won}\``,
        inline: true,
      },
      {
        name: '❌ Losing Bets',
        value: `\`${stats.bets_lost}\``,
        inline: true,
      },
      {
        name: '🎨 Color',
        value:
          `🔴 Red: \`${rates.COLOR.RED}\`\n` +
          `⚫ Black: \`${rates.COLOR.BLACK}\``,
        inline: true,
      },
      {
        name: '⚖️ Even / Odd',
        value:
          `Even: \`${rates.EVEN_ODD.EVEN}\`\n` +
          `Odd: \`${rates.EVEN_ODD.ODD}\``,
        inline: true,
      },
      {
        name: '⬇️ Low / High',
        value:
          `Low: \`${rates.LOW_HIGH.LOW}\`\n` +
          `High: \`${rates.LOW_HIGH.HIGH}\``,
        inline: true,
      },
      {
        name: '📦 Dozens',
        value:
          `1st: \`${rates.DOZEN.FIRST}\`\n` +
          `2nd: \`${rates.DOZEN.SECOND}\`\n` +
          `3rd: \`${rates.DOZEN.THIRD}\``,
        inline: true,
      },
      {
        name: '🧱 Columns',
        value:
          `1st: \`${rates.COLUMN.FIRST}\`\n` +
          `2nd: \`${rates.COLUMN.SECOND}\`\n` +
          `3rd: \`${rates.COLUMN.THIRD}\``,
        inline: true,
      },
      {
        name: '🃏 Special Bets',
        value:
          `Double Street: \`${rates.OTHER.DOUBLE_STREET}\`\n` +
          `Top Line: \`${rates.OTHER.TOP_LINE}\`\n` +
          `Corner: \`${rates.OTHER.CORNER}\`\n` +
          `Street: \`${rates.OTHER.STREET}\`\n` +
          `Row: \`${rates.OTHER.ROW}\`\n` +
          `Split: \`${rates.OTHER.SPLIT}\`\n` +
          `Single: \`${rates.OTHER.SINGLE}\``,
      }
    )
    .setFooter({ text: 'Kian Canes Metaverser Manager' })
    .setTimestamp();
}
