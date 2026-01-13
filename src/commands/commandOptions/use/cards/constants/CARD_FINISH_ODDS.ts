import type { CardFinish } from "../types/CardFinish.ts";

export const GLOBAL_CARD_FINISH_ODDS: Record<CardFinish, number> = {
  DIRTY: 110,
  NORMAL: 80,
  GOLD: 11,
  HOLO: 5,
  DIAMOND: 3,
  MOB: 1,
};