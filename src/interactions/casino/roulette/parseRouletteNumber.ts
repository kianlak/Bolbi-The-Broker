export function parseRouletteNumber(
  rawInput: string
): number | null {
  const input = rawInput.trim();

  // Special case: 00
  if (input === '00') {
    return 37;
  }

  // Reject leading zeros (e.g. 01, 002)
  if (/^0\d+/.test(input)) {
    return null;
  }

  // Must be digits only
  if (!/^\d+$/.test(input)) {
    return null;
  }

  const value = Number(input);

  if (!Number.isInteger(value)) {
    return null;
  }

  // Allow 0–36 only
  if (value < 0 || value > 36) {
    return null;
  }

  return value;
}
