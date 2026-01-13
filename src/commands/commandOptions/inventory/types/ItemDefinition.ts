import type { ItemCategory } from "./ItemCategory.ts";

export type ItemDefinition = {
  id: string;
  name: string;
  price?: number;
  description?: string;
  category: ItemCategory;
  available: boolean;
  metadata?: Record<string, unknown>;
}
