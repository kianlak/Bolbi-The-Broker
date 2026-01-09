export function isCornerWin(
  selection: string,
  roll: number
): boolean {
  const [, minStr] = selection.split('_');
  const min = Number(minStr);

  const numbers = [
    min,
    min + 1,
    min + 3,
    min + 4,
  ];

  return numbers.includes(roll);
}
