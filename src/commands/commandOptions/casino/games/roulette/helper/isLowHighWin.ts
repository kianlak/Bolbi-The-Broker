export function isLowHighWin(selection: string, roll: number): boolean {
  if (roll === 0 || roll === 37) return false;

  return selection === 'LOW'
    ? roll >= 1 && roll <= 18
    : roll >= 19 && roll <= 36;
}
