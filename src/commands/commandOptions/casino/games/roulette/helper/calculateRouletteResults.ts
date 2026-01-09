import { isWinningRouletteBet } from '../helper/isWinningRouletteBet.ts';
import { ROULETTE_PAYOUTS } from '../constants/ROULETTE_PAYOUTS.ts';

import type { RouletteBet } from '../types/RouletteBet.ts';

export type RouletteBetResult = {
  bet: RouletteBet;
  won: boolean;
  payout: number;
  profit: number;
};

export type RouletteSpinResult = {
  roll: number;
  totalWagered: number;
  totalPayout: number;
  netProfit: number;
  betResults: RouletteBetResult[];
};

export function calculateRouletteResult(
  roll: number,
  bets: RouletteBet[]
): RouletteSpinResult {
  let totalWagered = 0;
  let totalPayout = 0;

  const betResults: RouletteBetResult[] = bets.map(bet => {
    totalWagered += bet.amount;

    const won = isWinningRouletteBet(bet, roll);

    if (!won) {
      return {
        bet,
        won: false,
        payout: 0,
        profit: -bet.amount,
      };
    }

    const multiplier =
      ROULETTE_PAYOUTS[bet.category]?.returnMultiplier ?? 0;

    const payout = bet.amount * multiplier;
    const profit = payout - bet.amount;

    totalPayout += payout;

    return {
      bet,
      won: true,
      payout,
      profit,
    };
  });

  return {
    roll,
    totalWagered,
    totalPayout,
    netProfit: totalPayout - totalWagered,
    betResults,
  };
}
