export const CARD_BASE_PRICES = {
  COMMON: 50,
  RARE: 500,
  SUPER_RARE: 2500,
  EPIC: 5000,
};

export type CardRarity = keyof typeof CARD_BASE_PRICES;
