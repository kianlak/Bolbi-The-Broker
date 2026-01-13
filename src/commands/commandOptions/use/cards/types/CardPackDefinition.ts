import { CardRarity } from "./CardRarity.ts";

export type CardPackDefinition = {
  packId: string;
  packName: string;
  version: string;
  basePath: string;
  cardsPerPack: number;
  rarityOdds: Partial<Record<CardRarity, number>>;
};