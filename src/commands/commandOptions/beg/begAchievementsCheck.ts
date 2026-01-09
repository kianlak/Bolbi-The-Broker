import type { AchievementContext } from '../../../achievements/types/AchievementContext.ts';

export function hasBeggedAtLeast(amount: number) {
  return (ctx: AchievementContext): boolean => {
    return (ctx.stats.numberOfBegs ?? 0) >= amount;
  };
}
