import type { CardFinish } from '../types/CardFinish.ts';

export const CARD_FINISH_DISPLAY: Record<
  CardFinish,
  { label: string; emoji: string }
> = {
  NORMAL:     { label: 'Normal',     emoji: '⬜' },
  HOLO:       { label: 'Holo',       emoji: '✨' },
  GOLD:       { label: 'Gold',       emoji: '🪙' },
  DIAMOND:    { label: 'Diamond',    emoji: '💎' },
  DIRTY:      { label: 'Dirty',      emoji: '🤢' },
  MOB:        { label: 'Mob',        emoji: '🫂' }, 
};