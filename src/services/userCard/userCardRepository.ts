import { getDb } from '../../database/sqlite.ts';

import { USER_CARDS_QUERIES } from './queries.ts';

import type { UserCardRow } from './types/userCardRow.ts';

export class UserCardsRepository {
  addUserCard(
    discordId: string,
    packName: string,
    imageId: string,
    rarity: string,
    amount: number,
    cardId: string,
  ): void {
    const db = getDb();

    db.prepare(USER_CARDS_QUERIES.addUserCard).run(
      discordId,
      packName,
      imageId,
      rarity,
      amount,
      cardId
    );
  }

  getUserCardsByDiscordId(discordId: string): UserCardRow[] {
    const db = getDb();

    return db
      .prepare(USER_CARDS_QUERIES.getUserCardsByDiscordId)
      .all(discordId) as UserCardRow[];
  }

  getUserCardsByPack(
    discordId: string,
    packId: string
  ): UserCardRow[] {
    const db = getDb();

    return db
      .prepare(USER_CARDS_QUERIES.getUserCardsByPack)
      .all(discordId, packId) as UserCardRow[];
  }

  getOwnedPacks(discordId: string): string[] {
    const db = getDb();

    const rows = db
      .prepare(USER_CARDS_QUERIES.getOwnedPacksByDiscordId)
      .all(discordId) as { pack_id: string }[];

    return rows.map(r => r.pack_id);
  }

  getUserCardByCardId(cardId: string) {
    const db = getDb();

    return db
      .prepare(USER_CARDS_QUERIES.getUserCardByCardId)
      .get(cardId) as {
        pack_id: string;
        image_id: string;
        rarity: string;
        card_id: string;
        quantity: number;
      } | undefined;
  }
}
