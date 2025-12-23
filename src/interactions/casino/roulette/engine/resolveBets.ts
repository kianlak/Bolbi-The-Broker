import { isBlack, isRed } from "../data/rouletteConstants.ts";
import type { RouletteBet } from "../rouletteSession.ts";
import { ROULETTE_PAYOUTS } from "../types/RouletteBetCategory.ts";

export type ResolvedBet = {
  bet: RouletteBet;
  won: boolean;
  payout: number;
};

const CORNER_MAP: Record<string, number[]> = {
  C_1_5: [1, 2, 4, 5],
  C_2_6: [2, 3, 5, 6],
  C_4_8: [4, 5, 7, 8],
  C_5_9: [5, 6, 8, 9],
  C_7_11: [7, 8, 10, 11],
  C_8_12: [8, 9, 11, 12],
  C_10_14: [10, 11, 13, 14],
  C_11_15: [11, 12, 14, 15],
  C_13_17: [13, 14, 16, 17],
  C_14_18: [14, 15, 17, 18],
  C_16_20: [16, 17, 19, 20],
  C_17_21: [17, 18, 20, 21],
  C_19_23: [19, 20, 22, 23],
  C_20_24: [20, 21, 23, 24],
  C_22_26: [22, 23, 25, 26],
  C_23_27: [23, 24, 26, 27],
  C_25_29: [25, 26, 28, 29],
  C_26_30: [26, 27, 29, 30],
  C_28_32: [28, 29, 31, 32],
  C_29_33: [29, 30, 32, 33],
  C_31_35: [31, 32, 34, 35],
  C_32_36: [32, 33, 35, 36],
};

export function resolveBets(
  bets: RouletteBet[],
  result: number
): ResolvedBet[] {
  return bets.map((bet) => {
    let won = false;

    switch (bet.category) {
      case 'COLOR': {
        if (bet.target === 'RED' && isRed(result)) won = true;
        if (bet.target === 'BLACK' && isBlack(result)) won = true;
        break;
      }

      case 'EVEN_ODD': {
        if (result === 0 || result === 37) break;
        if (bet.target === 'EVEN' && result % 2 === 0) won = true;
        if (bet.target === 'ODD' && result % 2 === 1) won = true;
        break;
      }

      case 'LOW_HIGH': {
        if (result === 0 || result === 37) break;

        if (bet.target === 'LOW' && result >= 1 && result <= 18) won = true;
        if (bet.target === 'HIGH' && result >= 19 && result <= 36) won = true;
        break;
      }

      case 'NUMBER': {
        if (Number(bet.target) === result) won = true;
        break;
      }

      case 'DOZEN': {
        if (result === 0 || result === 37) break;

        if (bet.target === 'DOZEN_1' && result >= 1 && result <= 12) won = true;
        if (bet.target === 'DOZEN_2' && result >= 13 && result <= 24) won = true;
        if (bet.target === 'DOZEN_3' && result >= 25 && result <= 36) won = true;
        break;
      }

      case 'COLUMN': {
        if (result === 0 || result === 37) break;

        const column = result % 3 === 0 ? 3 : result % 3;

        if (
          (bet.target === 'COLUMN_1' && column === 1) ||
          (bet.target === 'COLUMN_2' && column === 2) ||
          (bet.target === 'COLUMN_3' && column === 3)
        ) {
          won = true;
        }

        break;
      }

      case 'DOUBLE_STREET': {
        if (result === 0 || result === 37) break;

        const ranges: Record<string, [number, number]> = {
          DS_1_6: [1, 6],
          DS_4_9: [4, 9],
          DS_7_12: [7, 12],
          DS_10_15: [10, 15],
          DS_13_18: [13, 18],
          DS_16_21: [16, 21],
          DS_19_24: [19, 24],
          DS_22_27: [22, 27],
          DS_25_30: [25, 30],
          DS_28_33: [28, 33],
          DS_31_36: [31, 36],
        };

        const [min, max] = ranges[bet.target as string];
        if (result >= min && result <= max) won = true;
        break;
      }

      case 'STREET': {
        if (result === 0 || result === 37) break;

        const ranges: Record<string, [number, number]> = {
          S_1_6: [1, 3],
          S_4_9: [4, 6],
          S_7_12: [7, 9],
          S_10_15: [10, 12],
          S_13_18: [13, 15],
          S_16_21: [16, 18],
          S_19_24: [19, 21],
          S_22_27: [22, 24],
          S_25_30: [25, 27],
          S_28_33: [28, 30],
          S_31_36: [31, 33],
          S_34_36: [34, 36],
        };

        const [min, max] = ranges[bet.target as string];
        if (result >= min && result <= max) won = true;
        break;
      }

      case 'TOP_LINE': {
        if ([0, 1, 2, 3, 37].includes(result)) won = true;
        break;
      }

      case 'ROW': {
        if ([0, 37].includes(result)) won = true;
        break;
      }

      case 'CORNER': {
        const numbers = CORNER_MAP[bet.target as string];
        if (!numbers) break;

        if (numbers.includes(result)) {
          won = true;
        }
        break;
      }

      case 'SPLIT': {
        const [, a, b] = String(bet.target).split('_');
        if (result === Number(a) || result === Number(b)) {
          won = true;
        }
        break;
      }
    }

    const rule = ROULETTE_PAYOUTS[bet.category];
    const payout = won
      ? bet.amount * rule.returnMultiplier
      : 0;

    return { bet, won, payout };
  });
}
