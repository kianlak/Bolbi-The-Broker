import { GLOBAL_CARD_FINISH_ODDS } from "../constants/CARD_FINISH_ODDS.ts";
import { CARD_PACK_REGISTRY } from "../constants/CARD_PACK_REGISTRY.ts";

export const PACK_RARITY_PRIORITY: Record<
  string,
  Record<string, number>
> = Object.fromEntries(
  Object.values(CARD_PACK_REGISTRY).map(pack => {
    const sorted = Object.entries(pack.rarityOdds)
      .sort((a, b) => a[1] - b[1]);

    const priority: Record<string, number> = {};
    sorted.forEach(([rarity], idx) => {
      priority[rarity] = sorted.length - idx;
    });

    return [pack.packName, priority];
  })
);

export const FINISH_PRIORITY: Record<string, number> = (() => {
  const sorted = Object.entries(GLOBAL_CARD_FINISH_ODDS)
    .sort((a, b) => a[1] - b[1]);

  const priority: Record<string, number> = {};
  sorted.forEach(([finish], idx) => {
    priority[finish] = sorted.length - idx;
  });

  return priority;
})();
