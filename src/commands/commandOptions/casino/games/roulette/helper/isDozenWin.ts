export function isDozenWin(selection: string, roll: number): boolean {
  if (roll === 0 || roll === 37) return false;

  switch (selection) {
    case '1': return roll >= 1 && roll <= 12;
    case '2': return roll >= 13 && roll <= 24;
    case '3': return roll >= 25 && roll <= 36;
    default: return false;
  }
}
