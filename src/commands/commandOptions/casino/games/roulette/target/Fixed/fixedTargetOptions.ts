import { RouletteBetCategory } from "../../types/RouletteBetCategory.ts";

export type FixedTargetOption = {
  label: string;
  value: string;
  emoji?: string
};

export const FIXED_TARGET_OPTIONS: Partial<
  Record<RouletteBetCategory, FixedTargetOption[]>
> = {
  [RouletteBetCategory.COLOR]: [
    { label: 'Red', value: 'RED', emoji: '🔴' },
    { label: 'Black', value: 'BLACK', emoji: '⚫' },
  ],

  [RouletteBetCategory.EVEN_ODD]: [
    { label: 'Even', value: 'EVEN' },
    { label: 'Odd', value: 'ODD' },
  ],

  [RouletteBetCategory.LOW_HIGH]: [
    { label: 'Low (1-18)', value: 'LOW' },
    { label: 'High (19-36)', value: 'HIGH' },
  ],

  [RouletteBetCategory.DOZEN]: [
    { label: '1-12', value: 'DOZEN_1' },
    { label: '13-24', value: 'DOZEN_2' },
    { label: '25-36', value: 'DOZEN_3' },
  ],

  [RouletteBetCategory.COLUMN]: [
    { label: 'Column 1', value: 'COLUMN_1' },
    { label: 'Column 2', value: 'COLUMN_2' },
    { label: 'Column 3', value: 'COLUMN_3' },
  ],
};
