import { GLOBAL_CARD_FINISH_ODDS } from "./constants/CARD_FINISH_ODDS.ts";

import { applyFlatOdds } from "./helper/applyFlatOdds.ts";

import type { CardFinish } from "./types/CardFinish.ts";

export function rollCardFinish(
  finishFlat?: Partial<Record<CardFinish, number>>
): CardFinish {
  const adjusted = applyFlatOdds(
    GLOBAL_CARD_FINISH_ODDS,
    finishFlat
  ) as Record<CardFinish, number>;

  const entries = Object.entries(adjusted) as
    Array<[CardFinish, number]>;

  const total = entries.reduce(
    (sum, [, weight]) => sum + weight,
    0
  );

  let roll = Math.random() * total;

  for (const [finish, weight] of entries) {
    roll -= weight;
    if (roll <= 0) {
      return finish;
    }
  }

  return entries[0][0];
}
