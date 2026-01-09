import type { AchievementTier } from "./AchievementTier.ts";

export type AchievementDefinition = {
  id: string;
  name: string;
  description: string;
  ui: {
    badgeBasePath: string;
  };
  tiers: AchievementTier[];
};
