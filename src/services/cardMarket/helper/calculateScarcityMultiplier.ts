export function calculateScarcityMultiplier(
  cardCirculation: number,
  totalCirculation: number
): number {
  if (totalCirculation === 0) return 1;

  const share = cardCirculation / totalCirculation;
  const NORMALIZATION = 0.05;

  const raw = 1 / Math.sqrt(share * NORMALIZATION);
  return clamp(raw, 0.5, 3);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}