import { EmbedBuilder } from 'discord.js';

import type { RouletteSession } from '../rouletteSession.ts';

export function buildRouletteDashboard(
  session: RouletteSession,
  userTag: string,
  userAvatarUrl: string
): EmbedBuilder {
  const total = session.bets.reduce(
    (sum, bet) => sum + bet.amount,
    0
  );

  const betsText =
    session.bets.length === 0
      ? '— No bets placed —'
      : session.bets
          .map(
            (bet, i) =>
              `${i + 1}. **${bet.category} → ${bet.target}** — $${bet.amount}`
          )
          .join('\n');

  return new EmbedBuilder()
    .setTitle('🎡 Roulette — Betting Table')
    .setAuthor({
      name: userTag,
      iconURL: userAvatarUrl,
    })
    .setDescription(
      [
        `session`,
        `**Total Wagered:** $${total}`,
        '',
        '**Your Bets:**',
        betsText,
      ].join('\n')
    )
    .setColor(0xe74c3c)
    .setFooter({
      text: `Add bets, remove bets, or spin when ready`,
    });
}
