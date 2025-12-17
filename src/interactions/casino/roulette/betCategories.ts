import { RouletteBetCategory } from "./types/RouletteBetCategory.ts";

export interface RouletteBetCategoryConfig {
  category: RouletteBetCategory;
  label: string;
  description: string;

  requiresTarget: boolean;
  targetType:
    | 'FIXED'
    | 'NUMBER_INPUT'
    | 'RANGE_SELECT'
    | 'PAIR_INPUT';

  enabled: boolean;
}

export const ROULETTE_BET_CATEGORIES: RouletteBetCategoryConfig[] = [
  {
    category: RouletteBetCategory.COLOR,
    label: 'Color',
    description: 'Bet on red or black',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.NUMBER,
    label: 'Single Number',
    description: 'Bet on a specific number (0–36 or 00)',
    requiresTarget: true,
    targetType: 'NUMBER_INPUT',
    enabled: true,
  },
  {
    category: RouletteBetCategory.EVEN_ODD,
    label: 'Even / Odd',
    description: 'Bet on whether the result is even or odd',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
];
