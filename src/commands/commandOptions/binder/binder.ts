import { logger } from '../../../shared/logger.ts';
import { getMessageChannelName } from '../../../helper/getMessageChannelName.ts';

import type { CommandContext } from '../../types/CommandContext.ts';
import { UserCardsService } from '../../../services/userCard/userCardService.ts';
import { CardMarketService } from '../../../services/cardMarket/cardMarketService.ts';

import { sortUserCards } from '../use/cards/helper/sortUserCards.ts';
import { buildBinderEmbed } from './ui/buildBinderEmbed.ts';
import { buildPackSelectMenu } from './ui/buildPackSelectMenu.ts';
import { buildCardViewEmbed } from '../use/cards/ui/buildCardViewEmbed.ts';
import { parseImageId } from '../use/cards/helper/parseImageId.ts';
import {
  isCardFinish,
  isCardRarity,
} from '../../../services/cardMarket/helper/typeGuard.ts';

export async function binder({ message, user, args }: CommandContext) {
  const commandName = binder.name;

  logger.starting(
    `[${user.username}] Starting "${commandName}" in ${getMessageChannelName(message)}`
  );

  const userCardsService = new UserCardsService();
  const marketService = new CardMarketService();

  /* ------------------------------
   * CARD VIEW: +binder v <cardId>
   * ------------------------------ */
  if (args?.[0] === 'v') {
    const cardId = args[1];

    if (!cardId) {
      await message.reply('❌ Usage: `+binder v <cardId>`');
      return;
    }

    const card = userCardsService.getCardByCardId(cardId);

    if (!card) {
      await message.reply('❌ Card not found.');
      return;
    }

    const { finish, cardTemplateId } = parseImageId(
      card.image_id,
      card.pack_id
    );

    if (!isCardRarity(card.rarity) || !isCardFinish(finish)) {
      throw new Error('Invalid card data');
    }

    const marketPrice = marketService.getMarketPrice({
      rarity: card.rarity,
      finish,
      cardTemplateId,
    });

    const sellPrice = marketService.getSellPrice({
      rarity: card.rarity,
      finish,
      cardTemplateId,
    });

    const { embed, file } = buildCardViewEmbed({
      ...card,
      marketPrice,
      sellPrice,
    });

    await message.reply({
      embeds: [embed],
      files: [file],
    });

    return;
  }

  /* ------------------------------
   * NORMAL BINDER VIEW
   * ------------------------------ */
  const targetId =
    message.mentions.users.first()?.id ??
    args?.[0] ??
    user.id;

  const ownedPacks = userCardsService.getOwnedPacks(targetId);

  if (ownedPacks.length === 0) {
    await message.reply('📭 This binder is empty.');
    return;
  }

  const defaultPack = ownedPacks[0];
  const rows = userCardsService.getUserCardsByPack(
    targetId,
    defaultPack
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
    message.client.users.cache.get(targetId)?.username ??
      'Unknown User',
    rowsWithPrices
  );

  const menu = buildPackSelectMenu(
    user.id,
    targetId,
    ownedPacks
  );

  await message.reply({
    embeds: [embed],
    components: [menu],
  });
}
