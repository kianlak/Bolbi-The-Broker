import type { AchievementContext } from "../../../../achievements/types/AchievementContext.ts";

export function hasCollectedAtLeast(amount: number) {
  return (ctx: AchievementContext): boolean => {
    return (ctx.stats.numberOfCardsCollected ?? 0) >= amount;
  };
}
