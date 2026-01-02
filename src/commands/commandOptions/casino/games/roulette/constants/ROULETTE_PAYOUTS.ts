import { RouletteBetCategory } from "../types/RouletteBetCategory.ts";

export const ROULETTE_PAYOUTS: Record<
  RouletteBetCategory,
  { returnMultiplier: number }
> = {
  COLOR: { returnMultiplier: 2 },
  EVEN_ODD: { returnMultiplier: 2 },
  LOW_HIGH: { returnMultiplier: 2 },
  DOZEN: { returnMultiplier: 3 },
  COLUMN: { returnMultiplier: 3 },
  DOUBLE_STREET: { returnMultiplier: 6 },
  TOP_LINE: { returnMultiplier: 7},
  CORNER: { returnMultiplier: 9 },
  STREET: { returnMultiplier: 12 },
  ROW: { returnMultiplier: 18 },
  SPLIT: { returnMultiplier: 18 },
  NUMBER: { returnMultiplier: 36 },
};