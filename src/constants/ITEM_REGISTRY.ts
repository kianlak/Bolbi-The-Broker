import type { ItemDefinition } from "../commands/commandOptions/inventory/types/ItemDefinition.ts";

export const ITEM_REGISTRY = {
  cringeboard_pack_v1: {
    id: 'cbpackv1',
    price: 1000,
    name: 'Cringeboard Pack V1 (Starter Edition)',
    description: 'Contains 2 random rewards',
    category: 'CARD_PACKS',
    available: true,
    metadata: {
      packId: 'cringeboard_v1',
      packName: 'cringeboard',
      version: 'v1',
    },
  },
} satisfies Record<string, ItemDefinition>;
