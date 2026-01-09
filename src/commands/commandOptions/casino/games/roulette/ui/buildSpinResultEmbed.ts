import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import type { CacheType } from 'discord.js';

import { formatRouletteBetLabel } from '../helper/formatRouletteBetsLabel.ts';
import type { RouletteSpinResult } from '../helper/calculateRouletteResults.ts';

function formatRoll(roll: number): string {
  return roll === 37 ? '00' : String(roll);
}

export function buildSpinResultEmbed(
  result: RouletteSpinResult,
  interaction: ButtonInteraction<CacheType>
) {
  const { roll, netProfit, betResults } = result;

  const profitLine =
    netProfit > 0
      ? `🟢 **Profit:** +$${netProfit}`
      : netProfit < 0
        ? `🔴 **Loss:** -$${Math.abs(netProfit)}`
        : `⚪ **Break Even**`;

  const color =
    netProfit > 0
      ? 0x27ae60
      : netProfit < 0
        ? 0xe74c3c
        : 0xbdc3c7;

  const betLines =
    betResults.length === 0
      ? '— No bets placed —'
      : betResults
          .map((res, i) => {
            const label = formatRouletteBetLabel(res.bet);
            const emoji = res.won ? '✅' : '❌';
            return `${i + 1}. **${label}** — $${res.bet.amount} ${emoji}`;
          })
          .join('\n');

  return new EmbedBuilder()
    .setTitle('🎡 Roulette — Spin Result')
    .setThumbnail(interaction.user.avatarURL())
    .setDescription(
      `**Result:** 🎯 **${formatRoll(roll)}**\n\n${profitLine}`
    )
    .addFields({
      name: 'Bets',
      value: betLines,
    })
    .setColor(color);
}
