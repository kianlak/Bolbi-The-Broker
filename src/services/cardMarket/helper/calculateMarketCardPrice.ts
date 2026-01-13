import { CARD_BASE_PRICES } from "../constants/CARD_BASE_PRICES.ts";
import { CARD_FINISH_MULTIPLIERS } from "../constants/CARD_FINISH_MULTIPLIERS.ts";

import { calculateScarcityMultiplier } from "./calculateScarcityMultiplier.ts";
import { getRarityFloor } from "./getRarityFloor.ts";


export function calculateMarketCardPrice(input: {
  rarity: keyof typeof CARD_BASE_PRICES;
  finish: keyof typeof CARD_FINISH_MULTIPLIERS;
  cardCirculation: number;
  totalCirculation: number;
}): number {
  const base = CARD_BASE_PRICES[input.rarity];
  const finishMult = CARD_FINISH_MULTIPLIERS[input.finish];

  const scarcity = calculateScarcityMultiplier(
    input.cardCirculation,
    input.totalCirculation
  );

  const rarityFloor = getRarityFloor(input.rarity, base);

  const value = base * scarcity * finishMult;

  return Math.max(rarityFloor, Math.floor(value));
}
