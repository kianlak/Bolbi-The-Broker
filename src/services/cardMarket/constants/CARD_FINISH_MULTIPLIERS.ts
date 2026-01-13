export const CARD_FINISH_MULTIPLIERS = {
  DIRTY:   0.4,
  NORMAL:  1.0,
  GOLD:    1.2,
  HOLO:    1.7,
  DIAMOND: 2.5,
  MOB:     5,
} as const;

export type CardFinish = keyof typeof CARD_FINISH_MULTIPLIERS;