import { CARD_BASE_PRICES, CardRarity } from "../constants/CARD_BASE_PRICES.ts";
import { CARD_FINISH_MULTIPLIERS, CardFinish } from "../constants/CARD_FINISH_MULTIPLIERS.ts";

const RARITY_FLOORS: Record<CardRarity, number> = {
  COMMON: 1 / 50,
  RARE: 1 / 5,
  SUPER_RARE: 1 / 2,
  EPIC: 6 / 8,
};

export function calculateCardPrice(
  rarity: CardRarity,
  finish: CardFinish,
  cardCopies: number,
  totalCopies: number
): number {
  const base = CARD_BASE_PRICES[rarity];
  const finishMultiplier = CARD_FINISH_MULTIPLIERS[finish];

  const share = cardCopies / totalCopies;

  const scarcityMultiplier = Math.min(
    2.5,
    Math.max(
      1.8 / (1 + share * 6),
      RARITY_FLOORS[rarity]
    )
  );

  const raw = base * scarcityMultiplier * finishMultiplier;

  return Math.max(1, Math.floor(raw));
}
