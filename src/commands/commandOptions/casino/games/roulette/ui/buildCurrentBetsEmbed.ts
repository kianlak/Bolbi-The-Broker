import { EmbedBuilder, ModalSubmitInteraction } from 'discord.js';

import type { CacheType } from 'discord.js';

import { formatRouletteBetLabel } from '../helper/formatRouletteBetsLabel.ts';

import type { RouletteBet } from '../types/RouletteBet.ts';

export function buildCurrentBetsEmbed(
  bets: RouletteBet[], 
  interaction: ModalSubmitInteraction<CacheType>
) {
  return new EmbedBuilder()
    .setTitle('🎟️ Current Bets')
    .setImage('attachment://rouletteTable.png')
    .setThumbnail(interaction.user.displayAvatarURL())
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