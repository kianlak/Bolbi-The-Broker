export function isSplitWin(selection: string, roll: number): boolean {
  const [a, b] = selection.split('_');

  if (!a || !b) return false;

  return roll === Number(a) || roll === Number(b);
}
