export type RouletteColor = 'red' | 'black';

export interface RouletteResult {
  bet: RouletteColor;
  result: RouletteColor;
  won: boolean;
}

export function spinRoulette(bet: RouletteColor): RouletteResult {
  const result: RouletteColor = Math.random() < 0.5 ? 'red' : 'black';

  return {
    bet,
    result,
    won: bet === result,
  };
}
