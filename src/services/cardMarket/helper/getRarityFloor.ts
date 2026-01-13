import type { CardRarity } from "../constants/CARD_BASE_PRICES.ts";

export function getRarityFloor(
  rarity: CardRarity,
  basePrice: number
): number {
  switch (rarity) {
    case 'COMMON':
      return 1;
    case 'RARE':
      return Math.floor(basePrice / 5);
    case 'SUPER_RARE':
      return Math.floor(basePrice / 2);
    case 'EPIC':
      return Math.floor((basePrice * 6) / 8);
    default:
      return Math.floor(basePrice * 0.5);
  }
}