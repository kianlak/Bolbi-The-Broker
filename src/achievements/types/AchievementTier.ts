import type { AchievementContext } from "./AchievementContext.ts";
import type { CardFinish } from "../../commands/commandOptions/use/cards/types/CardFinish.ts";
import type { CardRarity } from "../../commands/commandOptions/use/cards/types/CardRarity.ts";

export type AchievementTier = {
  tier: number;
  check: (ctx: AchievementContext) => boolean;
  reward?: {
    multiplier?: number;
    cardRoll?: {
      rarityFlat?: Partial<Record<CardRarity, number>>;
      finishFlat?: Partial<Record<CardFinish, number>>;
    };
  };
};
