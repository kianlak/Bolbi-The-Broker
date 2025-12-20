export const RouletteBetCategory = {
  COLOR: 'COLOR',
  NUMBER: 'NUMBER',
  EVEN_ODD: 'EVEN_ODD',
  LOW_HIGH: 'LOW_HIGH',
  DOZEN: 'DOZEN',
  COLUMN: 'COLUMN',
  DOUBLE_STREET: 'DOUBLE_STREET',
  STREET: 'STREET',
} as const;

export type RouletteBetCategory =
  typeof RouletteBetCategory[keyof typeof RouletteBetCategory];

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
  STREET: { returnMultiplier: 12 },
  NUMBER: { returnMultiplier: 36 },
};