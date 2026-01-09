import { ACHIEVEMENTS } from "../../achievements/constant/ACHIEVEMENTS.ts";
import type { AchievementContext } from "../../achievements/types/AchievementContext.ts";
import { UserService } from "../user/userService.ts";
import { AchievementRepository } from "./achievementRepository.ts";

import type { AchievementUpgradeResult } from "../../achievements/types/AchievementUpgraded.ts";

export class AchievementService {
  private readonly repo = new AchievementRepository();
  private readonly userService = new UserService();

  checkAchievement(
    discordId: string,
    achievementId: string
  ): AchievementUpgradeResult {
    const achievement = ACHIEVEMENTS.find(
      a => a.id === achievementId
    );
    if (!achievement) return { upgraded: false };

    const user = this.userService.getUser(discordId);
    if (!user) return { upgraded: false };

    const ctx: AchievementContext = {
      discordId,
      stats: {
        numberOfBegs: user.number_of_begs,
      },
    };

    const currentTier = this.repo.getTier(discordId, achievementId);

    const eligibleTier = achievement.tiers
      .filter(t => t.check(ctx))
      .map(t => t.tier)
      .pop();

    if (!eligibleTier || eligibleTier <= currentTier) {
      return { upgraded: false };
    }

    this.repo.setTier(discordId, achievementId, eligibleTier);

    return {
      upgraded: true,
      newTier: eligibleTier,
    };
  }

  getTier(discordId: string, achievementId: string): number {
    return this.repo.getTier(discordId, achievementId);
  }

  getBegMultiplierFromTier(tier: number): number {
  const achievement = ACHIEVEMENTS.find(
    a => a.id === 'master_beggar'
  );

  const tierDef = achievement?.tiers.find(
    t => t.tier === tier
  );

  return tierDef?.reward?.multiplier ?? 1;
}
}
