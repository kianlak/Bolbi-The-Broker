import { EmbedBuilder } from 'discord.js';

import { formatRouletteBetLabel } from '../helper/formatRouletteBetsLabel.ts';

import type { RouletteBet } from '../types/RouletteBet.ts';

export function buildCurrentBetsEmbed(
  bets: RouletteBet[], 
  user: {
    username: string;
    avatarUrl: string | null;
  }
) {
  return new EmbedBuilder()
    .setTitle('🎟️ Roulette — Betting Table')
    .setImage('attachment://rouletteTable.png')
    .setThumbnail(user.avatarUrl)
    .setDescription(
      bets.length === 0
        ? `— No bets yet —`
        : bets
            .map((bet, index) => {
              const label = formatRouletteBetLabel(bet);
              return `${index + 1}. **${label}** — $${bet.amount}`;
            }).join('\n')
    )
    .setColor(0x27ae60);
}