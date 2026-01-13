import { getDb } from '../../database/sqlite.ts';

export class CardMarketRepository {
  getTotalCardsInCirculation(): number {
    const db = getDb();
    const row = db
      .prepare(`SELECT SUM(quantity) as total FROM user_cards`)
      .get() as { total: number | null };

    return row?.total ?? 0;
  }

  getCopiesOfCard(cardTemplateId: string): number {
    const db = getDb();
    const row = db
      .prepare(`
        SELECT SUM(quantity) as total
        FROM user_cards
        WHERE image_id LIKE ?
      `)
      .get(`%_${cardTemplateId}`) as { total: number | null };

    return row?.total ?? 0;
  }
}