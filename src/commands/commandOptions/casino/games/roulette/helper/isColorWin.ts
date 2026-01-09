const RED_NUMBERS = new Set([
  1,3,5,7,9,12,14,16,18,
  19,21,23,25,27,30,32,34,36,
]);

export function isColorWin(selection: string, roll: number): boolean {
  if (roll === 0 || roll === 37) return false;

  const isRed = RED_NUMBERS.has(roll);
  return selection === 'RED' ? isRed : !isRed;
}
