import type { ItemCategory } from '../types/ItemCategory.ts';

export const CATEGORY_DISPLAY: Record<
  ItemCategory,
  { label: string; emoji: string }
> = {
  CARD_PACKS: { label: 'Card Packs', emoji: '🎁' },
};