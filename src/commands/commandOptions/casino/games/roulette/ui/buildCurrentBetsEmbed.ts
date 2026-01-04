import { EmbedBuilder } from 'discord.js';

import type { RouletteBet } from '../types/RouletteBet.ts';

export function buildCurrentBetsEmbed(bets: RouletteBet[]) {
  return new EmbedBuilder()
    .setTitle('🎟️ Current Bets')
    .setDescription(
      bets.length === 0
        ? `_No bets yet_ `
        : bets
            .map(
              b =>
                `• **${b.category} → ${b.selection}** — $${b.amount}`
            )
            .join('\n')
    )
    .setColor(0x27ae60);
}
