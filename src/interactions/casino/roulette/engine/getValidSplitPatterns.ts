export function getValidSplitPartners(n: number): number[] {
  const partners = new Set<number>();

  // 0 ↔ 1
  if (n === 0) {
    partners.add(1);
    partners.add(2);
  }
  
  if (n === 1) partners.add(0);
  
  if (n === 37) {
    partners.add(2);
    partners.add(3);
  }

  if (n === 3) partners.add(37);
  
  if (n === 2) {
    partners.add(0);
    partners.add(37);
  } 
  

  if (n >= 1 && n <= 36) {
    if (n % 3 !== 1) partners.add(n - 1);
    if (n % 3 !== 0) partners.add(n + 1);

    if (n - 3 >= 1) partners.add(n - 3);
    if (n + 3 <= 36) partners.add(n + 3);
  }

  return [...partners].sort((a, b) => a - b);
}
