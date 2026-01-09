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
    { label: 'Even', value: 'EVEN', emoji: '➕' },
    { label: 'Odd', value: 'ODD', emoji: '➖' },
  ],

  [RouletteBetCategory.LOW_HIGH]: [
    { label: 'Low (1-18)', value: 'LOW', emoji: '⬇️' },
    { label: 'High (19-36)', value: 'HIGH', emoji: '⬆️' },
  ],

  [RouletteBetCategory.DOZEN]: [
    { label: '1st 12', value: 'DOZEN_1', emoji: '🔢' },
    { label: '2nd 12', value: 'DOZEN_2', emoji: '🔢' },
    { label: '3rd 12', value: 'DOZEN_3', emoji: '🔢' },
  ],

  [RouletteBetCategory.COLUMN]: [
    { label: 'Column 1', value: 'COLUMN_1', emoji: '🧱' },
    { label: 'Column 2', value: 'COLUMN_2', emoji: '🧱' },
    { label: 'Column 3', value: 'COLUMN_3', emoji: '🧱' },
  ],
};
