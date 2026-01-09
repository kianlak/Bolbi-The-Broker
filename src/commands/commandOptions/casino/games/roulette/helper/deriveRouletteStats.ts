import type { RouletteSpinResult } from './calculateRouletteResults.ts';
import type { RouletteBetCategory } from '../types/RouletteBetCategory.ts';

export type RouletteBetStat = {
  betType: RouletteBetCategory;
  betKey: string;
  won: boolean;
  amount: number;
  profit: number;
};

export type DerivedRouletteStats = {
  spin: {
    spinsPlayed: number;
    netProfit: number;
    balehBucksWon: number;
    balehBucksLost: number;
    betsWon: number;
    betsLost: number;
    largestWin: number;
    largestLoss: number;
  };
  betStats: RouletteBetStat[];
};

export function deriveRouletteStats(
  result: RouletteSpinResult
): DerivedRouletteStats {
  let betsWon = 0;
  let betsLost = 0;
  let balehBucksWon = 0;
  let balehBucksLost = 0;
  let largestWin = 0;
  let largestLoss = 0;

  const betStats: RouletteBetStat[] = [];

  for (const res of result.betResults) {
    if (res.won) {
      betsWon++;
      balehBucksWon += res.profit;
      largestWin = Math.max(largestWin, res.profit);
    } else {
      betsLost++;
      balehBucksLost += Math.abs(res.profit);
      largestLoss = Math.max(largestLoss, Math.abs(res.profit));
    }

    betStats.push({
      betType: res.bet.category,
      betKey: res.bet.selection,
      won: res.won,
      amount: res.bet.amount,
      profit: res.profit,
    });
  }

  return {
    spin: {
      spinsPlayed: 1,
      netProfit: result.netProfit,
      balehBucksWon,
      balehBucksLost,
      betsWon,
      betsLost,
      largestWin,
      largestLoss,
    },
    betStats,
  };
}
