import type { CardPackDefinition } from "../types/CardPackDefinition.ts";

export const CARD_PACK_REGISTRY: Record<string, CardPackDefinition> = {
  'cringeboard:v1': {
    packId: 'cringeboard_v1',
    packName: 'cringeboard',
    version: 'v1',
    basePath: 'src/assets/images/packs/cbpacks/V1',
    cardsPerPack: 2,

    rarityOdds: {
      COMMON: 110,
      RARE: 10,
      SUPER_RARE: 4,
      EPIC: 1,
    },
  },
};