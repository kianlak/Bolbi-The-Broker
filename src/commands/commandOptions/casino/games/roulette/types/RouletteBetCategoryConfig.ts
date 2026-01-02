import { RouletteBetCategory } from "../../../../../../interactions/casino/roulette/types/RouletteBetCategory.ts";

export type RouletteBetCategoryConfig = {
  category: RouletteBetCategory;
  label: string;
  description: string;
  emoji: string;

  requiresTarget: boolean;
  targetType:
    | 'FIXED'
    | 'NUMBER_INPUT'
    | 'RANGE_SELECT'
    | 'PAIR_INPUT'
    | 'NUMBER_PAIR'
    | 'DROPDOWN';

  enabled: boolean;
}