export function applyFlatOdds(base: Record<string, number>, flat?: Record<string, number>): Record<string, number> {
  const result: Record<string, number> = {};

  for (const [key, value] of Object.entries(base)) {
    const delta = flat?.[key] ?? 0;
    result[key] = Math.max(1, value + delta);
  }

  return result;
}
