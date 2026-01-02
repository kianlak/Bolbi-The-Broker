export const RouletteBetCategory = {
  COLOR: 'COLOR',
  NUMBER: 'NUMBER',
  EVEN_ODD: 'EVEN_ODD',
  LOW_HIGH: 'LOW_HIGH',
  DOZEN: 'DOZEN',
  COLUMN: 'COLUMN',
  DOUBLE_STREET: 'DOUBLE_STREET',
  STREET: 'STREET',
  TOP_LINE: 'TOP_LINE',
  ROW: 'ROW',
  SPLIT: 'SPLIT',
  CORNER: 'CORNER',
} as const;

export type RouletteBetCategory =
  typeof RouletteBetCategory[keyof typeof RouletteBetCategory];