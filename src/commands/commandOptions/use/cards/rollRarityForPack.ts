import type { CardRarity } from "./types/CardRarity.ts";

export function rollRarityForPack(
  odds: Partial<Record<CardRarity, number>>
): CardRarity {
  const entries = Object.entries(odds) as [CardRarity, number][];
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  if (total <= 0) {
    throw new Error('Invalid rarity odds');
  }

  const roll = Math.random() * total;
  let cumulative = 0;

  for (const [rarity, chance] of entries) {
    cumulative += chance;
    if (roll < cumulative) {
      return rarity;
    }
  }

  return entries[0][0];
}