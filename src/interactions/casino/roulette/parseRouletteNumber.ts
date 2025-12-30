export function parseRouletteNumber(
  rawInput: string
): number | null {
  const input = rawInput.trim();

  if (input === '00') {
    return 37;
  }

  if (/^0\d+/.test(input)) {
    return null;
  }

  if (!/^\d+$/.test(input)) {
    return null;
  }

  const value = Number(input);

  if (!Number.isInteger(value)) {
    return null;
  }

  if (value < 0 || value > 36) {
    return null;
  }

  return value;
}
