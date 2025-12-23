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
    | 'PAIR_INPUT'
    | 'NUMBER_PAIR'
    | 'DROPDOWN';

  enabled: boolean;
}

export const ROULETTE_BET_CATEGORIES: RouletteBetCategoryConfig[] = [
  {
    category: RouletteBetCategory.COLOR,
    label: 'Color',
    description: 'Bet on whether the ball lands on red or black',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.EVEN_ODD,
    label: 'Even / Odd',
    description: 'Bet on whether the ball lands on an even or odd',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.LOW_HIGH,
    label: 'High / Low',
    description: 'Bet on a high (19-36) or low (1-18) spin',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.DOZEN,
    label: 'Dozens',
    description: 'Bet by 12\'s',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.COLUMN,
    label: 'Column',
    description: 'Bet by columns',
    requiresTarget: true,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.DOUBLE_STREET,
    label: 'Double Street',
    description: 'Bet on 6 consecutive numbers',
    requiresTarget: true,
    targetType: 'DROPDOWN',
    enabled: true,
  },
  {
    category: RouletteBetCategory.STREET,
    label: 'Street',
    description: 'Bet on 3 consecutive numbers',
    requiresTarget: true,
    targetType: 'DROPDOWN',
    enabled: true,
  },
  {
    category: RouletteBetCategory.TOP_LINE,
    label: 'Top Line',
    description: 'Bet on 0, 00, 1, 2, and 3',
    requiresTarget: false,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.ROW,
    label: 'Row',
    description: 'Bet on 0 and 00',
    requiresTarget: false,
    targetType: 'FIXED',
    enabled: true,
  },
  {
    category: RouletteBetCategory.CORNER,
    label: 'Corner',
    description: 'Bet on 4 numbers',
    requiresTarget: true,
    targetType: 'DROPDOWN',
    enabled: true,
  },
  {
    category: RouletteBetCategory.SPLIT,
    label: 'Split',
    description: 'Bet on two adjacent numbers',
    requiresTarget: true,
    targetType: 'NUMBER_PAIR',
    enabled: true,
  },
  {
    category: RouletteBetCategory.NUMBER,
    label: 'Single Number',
    description: 'Bet on a specific number (0-36 or 00)',
    requiresTarget: true,
    targetType: 'NUMBER_INPUT',
    enabled: true,
  },
];
