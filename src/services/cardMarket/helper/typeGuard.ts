import type { CardRarity } from "../constants/CARD_BASE_PRICES.ts";
import type { CardFinish } from "../constants/CARD_FINISH_MULTIPLIERS.ts";

export function isCardRarity(value: string): value is CardRarity {
  return (
    value === 'COMMON' ||
    value === 'RARE' ||
    value === 'SUPER_RARE' ||
    value === 'EPIC'
  );
}

export function isCardFinish(value: string): value is CardFinish {
  return (
    value === 'DIRTY' ||
    value === 'NORMAL' ||
    value === 'GOLD' ||
    value === 'HOLO' ||
    value === 'DIAMOND' ||
    value === 'MOB'
  );
}