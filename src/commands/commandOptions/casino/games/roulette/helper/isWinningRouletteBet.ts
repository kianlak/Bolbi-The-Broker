import { STATIC_BET_NUMBERS } from '../constants/STATIC_BET_NUMBERS.ts';

import { RouletteBetCategory } from '../types/RouletteBetCategory.ts';
import { isColorWin } from './isColorWin.ts';
import { isEvenOddWin } from './isEvenOddWin.ts';
import { isLowHighWin } from './isLowHighWin.ts';
import { isDozenWin } from './isDozenWin.ts';
import { isColumnWin } from './isColumnWin.ts';
import { isSplitWin } from './isSplitWin.ts';

import type { RouletteBet } from '../types/RouletteBet.ts';
import { isRangeWin } from './isRangewin.ts';
import { isCornerWin } from './isCornerWin.ts';

export function isWinningRouletteBet(bet: RouletteBet, roll: number): boolean {
  switch (bet.category) {
    case RouletteBetCategory.COLOR:
      return isColorWin(bet.selection, roll);

    case RouletteBetCategory.EVEN_ODD:
      return isEvenOddWin(bet.selection, roll);

    case RouletteBetCategory.LOW_HIGH:
      return isLowHighWin(bet.selection, roll);

    case RouletteBetCategory.DOZEN:
      return isDozenWin(bet.selection, roll);

    case RouletteBetCategory.COLUMN:
      return isColumnWin(bet.selection, roll);

    case RouletteBetCategory.CORNER:
      return isCornerWin(bet.selection, roll);
        
    case RouletteBetCategory.DOUBLE_STREET:
    case RouletteBetCategory.STREET: {
      return isRangeWin(bet.selection, roll);
    }

    case RouletteBetCategory.ROW:
    case RouletteBetCategory.TOP_LINE: {
      const numbers = STATIC_BET_NUMBERS[bet.category];
      return numbers ? numbers.includes(roll) : false;
    }

    case RouletteBetCategory.SPLIT:
      return isSplitWin(bet.selection, roll);

    case RouletteBetCategory.NUMBER:
      return Number(bet.selection) === roll;

    default:
      return false;
  }
}
