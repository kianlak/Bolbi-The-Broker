import type { StringSelectMenuInteraction } from 'discord.js';

import { UserCardsService } from
  '../../../../services/userCard/userCardService.ts';
import { CardMarketService } from
  '../../../../services/cardMarket/cardMarketService.ts';

import { sortUserCards } from
  '../../use/cards/helper/sortUserCards.ts';
import { buildBinderEmbed } from '../ui/buildBinderEmbed.ts';
import {
  isCardFinish,
  isCardRarity,
} from '../../../../services/cardMarket/helper/typeGuard.ts';

export async function binderPackSelectHandler(
  interaction: StringSelectMenuInteraction
) {
  const [, , viewerId, targetId] =
    interaction.customId.split(':');

  if (interaction.user.id !== viewerId) {
    await interaction.reply({
      content: '❌ **Only the command owner can use this menu**',
      ephemeral: true,
    });
    return;
  }

  const packId = interaction.values[0];

  const userCardsService = new UserCardsService();
  const marketService = new CardMarketService();

  const rows = userCardsService.getUserCardsByPack(
    targetId,
    packId
  );

  const sorted = sortUserCards(rows);

  const rowsWithPrices = sorted.map(row => {
    if (!isCardRarity(row.rarity) || !isCardFinish(row.finish)) {
      throw new Error('Invalid card data');
    }

    const marketPrice = marketService.getMarketPrice({
      rarity: row.rarity,
      finish: row.finish,
      cardTemplateId: row.cardTemplateId,
    });

    const sellPrice = marketService.getSellPrice({
      rarity: row.rarity,
      finish: row.finish,
      cardTemplateId: row.cardTemplateId,
    });

    return {
      ...row,
      marketPrice,
      sellPrice,
    };
  });

  const embed = buildBinderEmbed(
    interaction.client.users.cache.get(targetId)?.username ??
      'Unknown User',
    rowsWithPrices
  );

  await interaction.update({
    embeds: [embed],
  });
}
