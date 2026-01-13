import type { CardRarity } from "./CARD_BASE_PRICES.ts";

export const RARITY_FLOORS: Record<CardRarity, number> = {
  COMMON: 1 / 50,
  RARE: 1 / 5,
  SUPER_RARE: 1 / 2,
  EPIC: 6 / 8,
};

export const SELL_RATE = 0.8;