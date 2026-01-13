import type { InventoryItemView } from "./InventoryItemView.ts";
import type { ItemCategory } from "./ItemCategory.ts";

export type InventoryByCategory = Partial<
  Record<ItemCategory, InventoryItemView[]>
>;