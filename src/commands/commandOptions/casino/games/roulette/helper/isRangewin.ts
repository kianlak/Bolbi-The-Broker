import { extractRange } from "./formatRouletteNumber.ts";

export function isRangeWin(
  selection: string,
  roll: number
): boolean {
  const range = extractRange(selection);
  if (!range) return false;

  const [min, max] = range;
  return roll >= Number(min) && roll <= Number(max);
}