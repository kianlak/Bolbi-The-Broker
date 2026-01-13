import { SELL_FINISH_MULTIPLIERS } from "../constants/SELL_FINISH_MULTIPLIERS.ts";
import { SELL_RATE } from "../constants/SELL_RATE.ts";

export function calculateSellPrice(
  marketPrice: number,
  finish: keyof typeof SELL_FINISH_MULTIPLIERS
): number {
  const finishMult = SELL_FINISH_MULTIPLIERS[finish];

  const sellValue = marketPrice * SELL_RATE * finishMult;

  return Math.max(1, Math.floor(sellValue));
}