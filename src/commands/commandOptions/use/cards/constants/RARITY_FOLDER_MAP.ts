import type { CardRarity } from '../types/CardRarity.ts';

export const RARITY_FOLDER_MAP: Record<string, CardRarity> = {
  Common: 'COMMON',
  Rare: 'RARE',
  'Super Rare': 'SUPER_RARE',
  Epic: 'EPIC',
};