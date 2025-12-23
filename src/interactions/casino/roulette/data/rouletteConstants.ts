import { AttachmentBuilder } from "discord.js";

export const RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

export function isRed(n: number): boolean {
  return RED_NUMBERS.has(n);
}

export function isBlack(n: number): boolean {
  return n !== 0 && n !== 37 && !isRed(n);
}