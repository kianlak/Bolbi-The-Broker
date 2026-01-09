const COLUMN_1 = new Set([1,4,7,10,13,16,19,22,25,28,31,34]);
const COLUMN_2 = new Set([2,5,8,11,14,17,20,23,26,29,32,35]);
const COLUMN_3 = new Set([3,6,9,12,15,18,21,24,27,30,33,36]);

export function isColumnWin(selection: string, roll: number): boolean {
  if (roll === 0 || roll === 37) return false;

  switch (selection) {
    case 'COLUMN_1': return COLUMN_1.has(roll);
    case 'COLUMN_2': return COLUMN_2.has(roll);
    case 'COLUMN_3': return COLUMN_3.has(roll);
    default: return false;
  }
}
