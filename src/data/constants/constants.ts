import type { CasinoGame } from "../types/CasinoGame.ts";

export const BEG_COOLDOWN_MS = 2 * 60 * 60 * 1000; // 2 hours

export const CASINO_CHANNEL_ID = process.env.DISCORD_THANOS_CASINO_CHANNEL_ID;


export const CASINO_GAMES: CasinoGame[] = [
  {
    id: 'roulette',
    label: 'Roulette',
    description: 'Spin the wheel and place your bets',
    emoji: '🎡',
  },
];
