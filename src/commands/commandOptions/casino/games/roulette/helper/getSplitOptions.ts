export function getSplitOptions(base: number): number[] {
  const options = new Set<number>();

  if (base % 3 !== 1) options.add(base - 1);
  if (base % 3 !== 0) options.add(base + 1);
  if (base - 3 >= 1) options.add(base - 3);
  if (base + 3 <= 36) options.add(base + 3);

  if (base === 2 || base === 3) {
    options.add(37); // 00
  }

  if (base === 2 || base === 1) {
    options.add(0);
  }

  options.delete(base);

  options.forEach(n => {
    if (n < 0 || (n > 36 && n !== 37)) {
      options.delete(n);
    }
  });

  return [...options].sort((a, b) => a - b);
}