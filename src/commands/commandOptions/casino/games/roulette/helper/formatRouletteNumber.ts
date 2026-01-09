export function formatRouletteNumber(value: number): string {
  return value === 37 ? '00' : String(value);
}

function formatNumber(n: string | number): string {
  return String(n) === '37' ? '00' : String(n);
}

/**
 * Extracts a min/max range from selections like:
 * CORNER_2_6
 * DOUBLE_STREET_13_18
 */
export function extractRange(
  selection: string
): [string, string] | null {
  const parts = selection.split('_');

  if (parts.length < 3) return null;

  const min = parts.at(-2);
  const max = parts.at(-1);

  if (!min || !max) return null;

  return [min, max];
}