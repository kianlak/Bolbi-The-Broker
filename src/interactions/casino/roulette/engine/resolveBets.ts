import { isBlack, isRed } from "../data/rouletteConstants.ts";
import type { RouletteBet } from "../rouletteSession.ts";

export type ResolvedBet = {
  bet: RouletteBet;
  won: boolean;
  payout: number;
};

export function resolveBets(
  bets: RouletteBet[],
  result: number
): ResolvedBet[] {
  return bets.map(bet => {
    let won = false;
    let payout = 0;

    switch (bet.category) {
      case 'COLOR': {
        if (bet.target === 'RED' && isRed(result)) won = true;
        if (bet.target === 'BLACK' && isBlack(result)) won = true;
        if (won) payout = bet.amount * 2;
        break;
      }

      case 'EVEN_ODD': {
        if (result === 0 || result === 37) break;
        if (bet.target === 'EVEN' && result % 2 === 0) won = true;
        if (bet.target === 'ODD' && result % 2 === 1) won = true;
        if (won) payout = bet.amount * 2;
        break;
      }

      case 'NUMBER': {
        if (Number(bet.target) === result) {
          won = true;
          payout = bet.amount * 36;
        }
        break;
      }
    }

    return { bet, won, payout };
  });
}
