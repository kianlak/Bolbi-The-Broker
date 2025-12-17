export const RouletteBetCategory = {
  COLOR: 'COLOR',
  NUMBER: 'NUMBER',
  EVEN_ODD: 'EVEN_ODD',
} as const;

export type RouletteBetCategory =
  typeof RouletteBetCategory[keyof typeof RouletteBetCategory];
