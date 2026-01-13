import { hasBeggedAtLeast } from '../../commands/commandOptions/beg/begAchievementsCheck.ts';
import { hasCollectedAtLeast } from '../../commands/commandOptions/use/cards/hasCollectedAtLeast.ts';
import type { AchievementDefinition } from '../types/AchievementDefinition.ts';

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'master_beggar',
    name: 'Master Beggar',
    description: 'You\'re now more skilled at begging!',
    ui: {
      badgeBasePath: 'src/assets/images/achievements/masterBeggar',
    },
    tiers: [
      {
        tier: 1,
        check: hasBeggedAtLeast(50),
        reward: { multiplier: 1.10 },
      },
      {
        tier: 2,
        check: hasBeggedAtLeast(100),
        reward: { multiplier: 1.15 },
      },
      {
        tier: 3,
        check: hasBeggedAtLeast(150),
        reward: { multiplier: 1.25 },
      },
      {
        tier: 4,
        check: hasBeggedAtLeast(250),
        reward: { multiplier: 1.45 },
      },
    ],
  },

  {
    id: 'card_collector',
    name: 'Card Collector',
    description:
      'Your growing collection improves your card luck.',
    ui: {
      badgeBasePath:
        'src/assets/images/achievements/masterBeggar',
    },
    tiers: [
      {
        tier: 1,
        check: hasCollectedAtLeast(75),
        reward: {
          cardRoll: {
            rarityFlat: { COMMON: -5 },
          },
        },
      },
      {
        tier: 2,
        check: hasCollectedAtLeast(150),
        reward: {
          cardRoll: {
            rarityFlat: { COMMON: -10 },
          },
        },
      },
      {
        tier: 3,
        check: hasCollectedAtLeast(225),
        reward: {
          cardRoll: {
            rarityFlat: { COMMON: -15 },
          },
        },
      },
      {
        tier: 4,
        check: hasCollectedAtLeast(500),
        reward: {
          cardRoll: {
            rarityFlat: { COMMON: -30 },
            finishFlat: { MOB: +1 },
          },
        },
      },
    ],
  },
];
