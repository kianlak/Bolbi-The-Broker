import { getDb } from '../../database/sqlite.ts';

import { INVENTORY_QUERIES } from './queries.ts';

import type { ItemId } from '../../commands/commandOptions/inventory/types/ItemId.ts';

export class InventoryRepository {
  addItem(
    discordId: string,
    itemId: ItemId,
    amount: number
  ): void {
    const db = getDb();

    db.prepare(INVENTORY_QUERIES.addItem).run(
      discordId,
      itemId,
      amount
    );
  }

  getInventory(
    discordId: string
  ): Array<{ item_id: ItemId; quantity: number }> {
    const db = getDb();

    return db
      .prepare(INVENTORY_QUERIES.getInventory)
      .all(discordId) as Array<{
        item_id: ItemId;
        quantity: number;
      }>;
  }
}