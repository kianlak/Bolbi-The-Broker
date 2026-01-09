import type { AchievementContext } from "./AchievementContext.ts";

export type AchievementTier = {
  tier: number;
  check: (ctx: AchievementContext) => boolean;
  reward?: {
    multiplier?: number;
  };
};
