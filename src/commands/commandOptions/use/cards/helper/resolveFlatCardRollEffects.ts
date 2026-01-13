import { ACHIEVEMENTS } from "../../../../../achievements/constant/ACHIEVEMENTS.ts";

export function resolveFlatCardRollEffects(
  achievementId: string,
  tier: number
) {
  const achievement = ACHIEVEMENTS.find(
    a => a.id === achievementId
  );

  if (!achievement || tier <= 0) {
    return { rarityFlat: {}, finishFlat: {} };
  }

  const rarityFlat: Record<string, number> = {};
  const finishFlat: Record<string, number> = {};

  for (const t of achievement.tiers) {
    if (t.tier > tier) continue;

    const reward = t.reward;
    if (!reward || !reward.cardRoll) continue;

    if (reward.cardRoll.rarityFlat) {
      Object.assign(rarityFlat, reward.cardRoll.rarityFlat);
    }

    if (reward.cardRoll.finishFlat) {
      Object.assign(finishFlat, reward.cardRoll.finishFlat);
    }
  }

  return { rarityFlat, finishFlat };
}
