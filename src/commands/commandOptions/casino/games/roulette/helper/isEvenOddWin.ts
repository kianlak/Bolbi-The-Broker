export function isEvenOddWin(selection: string, roll: number): boolean {
  if (roll === 0 || roll === 37) return false;

  return selection === 'EVEN'
    ? roll % 2 === 0
    : roll % 2 === 1;
}
