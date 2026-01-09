import { RouletteBetCategory } from "./RouletteBetCategory.ts";

export type RouletteBetCategoryConfig = {
  category: RouletteBetCategory;
  label: string;
  description: string;
  emoji: string;

  requiresTarget: boolean;
  targetType:
    | 'FIXED'
    | 'NUMBER_INPUT'
    | 'SPLIT'
    | 'DROPDOWN'
    | 'STATIC';

  enabled: boolean;
}