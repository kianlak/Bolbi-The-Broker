import type { RouletteBet } from './RouletteBet.ts';

export type RouletteSpinResult = {
  roll: number;
  bets: RouletteBet[];

  netProfit: number;

  betsWon: number;
  betsLost: number;

  largestWin: number;
  largestLoss: number;
};
