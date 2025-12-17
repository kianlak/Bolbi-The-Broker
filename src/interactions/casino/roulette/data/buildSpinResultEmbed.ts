import { EmbedBuilder } from 'discord.js';

import type { ResolvedBet } from '../engine/resolveBets.ts';

export function buildSpinResultEmbed(
  result: number,
  resolved: ResolvedBet[]
): EmbedBuilder {
  const pretty = result === 37 ? '00' : result;
  const totalBet = resolved.reduce((s, r) => s + r.bet.amount, 0);
  const totalWon = resolved.reduce((s, r) => s + r.payout, 0);
  const net = totalWon - totalBet;

  const lines =
    resolved.length === 0
      ? ['No bets placed']
      : resolved.map(r =>
          r.won
            ? `✅ **${r.bet.category} → ${r.bet.target}** +$${r.payout}`
            : `❌ **${r.bet.category} → ${r.bet.target}** -$${r.bet.amount}`
        );

  return new EmbedBuilder()
    .setTitle('🎲 Roulette Results')
    .setDescription(
      [
        `**Result:** ${pretty}`,
        '',
        ...lines,
        '',
        `**Net:** ${net >= 0 ? '+' : ''}$${net}`,
      ].join('\n')
    )
    .setColor(net >= 0 ? 0x2ecc71 : 0xe74c3c);
}
