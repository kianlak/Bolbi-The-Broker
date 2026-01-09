export type AchievementUpgradeResult =
  | { upgraded: false }
  | { upgraded: true; newTier: number };
