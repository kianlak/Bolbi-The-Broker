import { RouletteBetCategory } from '../types/RouletteBetCategory.ts';

export const STATIC_BET_NUMBERS: Partial<
  Record<RouletteBetCategory, number[]>
> = {
  [RouletteBetCategory.ROW]: [0, 37],
  [RouletteBetCategory.TOP_LINE]: [0, 37, 1, 2, 3],
};
