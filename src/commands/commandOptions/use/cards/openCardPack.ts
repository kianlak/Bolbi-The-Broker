import fs from 'fs';
import path from 'path';
import { CARD_PACK_REGISTRY } from './constants/CARD_PACK_REGISTRY.ts';
import { RARITY_FOLDER_MAP } from './constants/RARITY_FOLDER_MAP.ts';
import { rollRarityForPack } from './rollRarityForPack.ts';
import { applyFlatOdds } from './helper/applyFlatOdds.ts';

import type { CardRarity } from './types/CardRarity.ts';

export type OpenedCard = {
  filename: string;
  rarity: CardRarity;
  filePath: string;
};

export function openCardPack(
  packName: string,
  version: string,
  rarityFlat?: Record<string, number>
): OpenedCard[] {
  const key = `${packName}:${version}`;
  const pack = CARD_PACK_REGISTRY[key];

  if (!pack) {
    throw new Error(`Unknown card pack: ${key}`);
  }

  const adjustedOdds = applyFlatOdds(
    pack.rarityOdds,
    rarityFlat
  );
  
  const basePath = path.resolve(pack.basePath);

  const cardsByRarity: Partial<Record<CardRarity, OpenedCard[]>> = {};

  for (const [folderName, rarity] of Object.entries(RARITY_FOLDER_MAP)) {
    const folderPath = path.join(basePath, folderName);

    if (!fs.existsSync(folderPath)) continue;

    const files = fs
      .readdirSync(folderPath)
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

    if (files.length === 0) continue;

    cardsByRarity[rarity] = files.map(file => ({
      filename: file,
      rarity,
      filePath: path.join(folderPath, file),
    }));
  }

  const results: OpenedCard[] = [];

  for (let i = 0; i < pack.cardsPerPack; i++) {
    let rarity = rollRarityForPack(adjustedOdds);

    if (!cardsByRarity[rarity]?.length) {
      rarity = Object.keys(cardsByRarity)[0] as CardRarity;
    }

    const pool = cardsByRarity[rarity];
    if (!pool || pool.length === 0) {
      throw new Error('No cards available in pack');
    }

    const card = pool[Math.floor(Math.random() * pool.length)];
    results.push(card);
  }

  return results;
}