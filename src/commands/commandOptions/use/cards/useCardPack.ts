import { EmbedBuilder } from 'discord.js';
import path from 'path';

import { CARD_FINISH_DISPLAY } from './constants/CARD_FINISH_DISPLAY.ts';
import { openCardPack } from './openCardPack.ts';
import { rollCardFinish } from './rollCardFinish.ts';
import { applyCardFinishOverlay } from './applyCardFinishOverlay.ts';

import { UserCardsService } from
  '../../../../services/userCard/userCardService.ts';
import { UserService } from
  '../../../../services/user/userService.ts';
import { AchievementService } from
  '../../../../services/achievement/achievementService.ts';

import { generateCardId } from './helper/generateCardId.ts';
import { resolveFlatCardRollEffects } from
  './helper/resolveFlatCardRollEffects.ts';

import type { ItemDefinition } from
  '../../inventory/types/ItemDefinition.ts';
import { ACHIEVEMENTS } from '../../../../achievements/constant/ACHIEVEMENTS.ts';
import { getAchievementBadgePath } from '../../../../achievements/getAchievementBadgePath.ts';
import { buildAchievementUnlockEmbed } from '../../../../achievements/ui/buildAchievementUnlockEmbed.ts';

export async function useCardPack(
  item: ItemDefinition,
  userId: string,
  channel: any
) {
  const { packId, packName, version } = item.metadata as {
    packId: string;
    packName: string;
    version: string;
  };

  const userService = new UserService();
  const userCardsService = new UserCardsService();
  const achievementService = new AchievementService();

  const collectorTier = achievementService.getTier(
    userId,
    'card_collector'
  );

  const { rarityFlat, finishFlat } =
    resolveFlatCardRollEffects(
      'card_collector',
      collectorTier
    );

  const cards = openCardPack(
    packName,
    version,
    rarityFlat
  );

  for (const card of cards) {
    const cardName = formatCardName(card.filename);
    const finish = rollCardFinish(finishFlat);

    const { imageId, imagePath } =
      await applyCardFinishOverlay({
        baseImagePath: card.filePath,
        packId,
        finish,
      });

    const cardId = generateCardId(userId, imageId);

    userCardsService.addCardToUser(
      userId,
      packId,
      imageId,
      card.rarity,
      cardId
    );

    userService.incrementNumberOfCardsCollected(userId, 1);

    const finishDisplay = CARD_FINISH_DISPLAY[finish];
    const filename = path.basename(imagePath);

    const embed = new EmbedBuilder()
      .setTitle(`${getRarityEmoji(card.rarity)} ${cardName}`)
      .setDescription(
        [
          `**Rarity:** ${formatRarity(card.rarity)}`,
          `**Finish:** ${finishDisplay.emoji} ${finishDisplay.label}`,
          `**Card ID:** \`${cardId}\``,
        ].join('\n')
      )
      .setColor(getRarityColor(card.rarity))
      .setImage(`attachment://${filename}`);

    await channel.send({
      embeds: [embed],
      files: [
        {
          attachment: imagePath,
          name: filename,
        },
      ],
    });
  }

  const upgradeResult = achievementService.checkAchievement(
    userId,
    'card_collector'
  );

  if (upgradeResult.upgraded) {
    const achievement = ACHIEVEMENTS.find(
      a => a.id === 'card_collector'
    );

    if (achievement?.ui) {
      const badgePath = getAchievementBadgePath(
        achievement.ui.badgeBasePath,
        upgradeResult.newTier
      );

      const { embed, attachment } =
        buildAchievementUnlockEmbed({
          achievementName: achievement.name,
          tier: upgradeResult.newTier,
          description: achievement.description,
          badgePath,
        });

      await channel.send({
        embeds: [embed],
        files: [attachment],
      });
    }
  }
}

function formatRarity(rarity: string) {
  return rarity.replace('_', ' ');
}

function getRarityEmoji(rarity: string) {
  switch (rarity) {
    case 'COMMON': return '⚪';
    case 'RARE': return '🔵';
    case 'SUPER_RARE': return '🟡';
    case 'EPIC': return '🟣';
    default: return '❓';
  }
}

function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'COMMON': return 0x9ea3a8;
    case 'RARE': return 0x3498db;
    case 'SUPER_RARE': return 0xf1c40f;
    case 'EPIC': return 0x9b59b6;
    default: return 0xffffff;
  }
}

function formatCardName(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
