import type { RouletteBetCategory } from "./RouletteBetCategory.ts";

export type RouletteBet = {
  category: RouletteBetCategory;
  selection: string;
  amount: number;
};