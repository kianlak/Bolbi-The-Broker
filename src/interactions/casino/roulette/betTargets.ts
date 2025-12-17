export type RouletteColorTarget = 'RED' | 'BLACK';
export type RouletteEvenOddTarget = 'EVEN' | 'ODD';
export type RouletteNumberTarget = number;

export type RouletteBetTarget =
  | RouletteColorTarget
  | RouletteEvenOddTarget
  | RouletteNumberTarget;
