import { ITEM_REGISTRY } from "../../constants/ITEM_REGISTRY.ts";

import { InventoryRepository } from "./inventoryRepository.ts";
import { useItemEffect } from "../../commands/commandOptions/use/useItemEffect.ts";

import type { InventoryByCategory } from "../../commands/commandOptions/inventory/types/InventoryByCategory.ts";
import type { ItemId } from "../../commands/commandOptions/inventory/types/ItemId.ts";

export class InventoryService {
  private repo = new InventoryRepository();

  addItem(
    discordId: string,
    itemId: keyof typeof ITEM_REGISTRY,
    amount = 1
  ): void {
    this.repo.addItem(discordId, itemId, amount);
  }

  getInventoryGrouped(
    discordId: string
  ): InventoryByCategory {
    const rows = this.repo.getInventory(discordId);
    const grouped: InventoryByCategory = {};

    for (const row of rows) {
      const item = ITEM_REGISTRY[row.item_id];
      if (!item) continue;

      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }

      grouped[item.category]!.push({
        id: item.id,
        name: item.name,
        quantity: row.quantity,
      });
    }

    return grouped;
  }

  async useItem(
    discord_id: string,
    rawItemId: string,
    channel: any
  ) {
    const itemId = rawItemId as ItemId;
    const item = ITEM_REGISTRY[itemId];

    if (!item || !item.available) {
      throw new Error('Invalid item');
    }

    const inventory = this.repo.getInventory(discord_id);
    const entry = inventory.find(i => i.item_id === itemId);

    if (!entry || entry.quantity <= 0) {
      throw new Error('Item not owned');
    }

    await useItemEffect({
      item,
      discord_id,
      channel,
    });

    this.repo.addItem(discord_id, itemId, -1);
  }
}