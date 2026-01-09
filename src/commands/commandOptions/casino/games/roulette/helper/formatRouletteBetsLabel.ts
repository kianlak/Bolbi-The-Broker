import type { RouletteBet } from '../types/RouletteBet.ts';
import { RouletteBetCategory } from '../types/RouletteBetCategory.ts';
import { extractRange } from './formatRouletteNumber.ts';

export function formatRouletteBetLabel(bet: RouletteBet): string {
  function extractIndex(selection: string): number | null {
    const match = selection.match(/_(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  function formatNumber(n: string | number): string {
    return String(n) === '37' ? '00' : String(n);
  }

  switch (bet.category) {
    case RouletteBetCategory.COLOR:
      return bet.selection === 'RED' ? 'Red' : 'Black';

    case RouletteBetCategory.EVEN_ODD:
      return bet.selection === 'EVEN' ? 'Even' : 'Odd';

    case RouletteBetCategory.LOW_HIGH:
      return bet.selection === 'LOW' ? 'Low (1-18)' : 'High (19-36)';

    case RouletteBetCategory.DOZEN: {
      const index = extractIndex(bet.selection);
      if (index === 1) return '1st 12 (1-12)';
      if (index === 2) return '2nd 12 (13-24)';
      if (index === 3) return '3rd 12 (25-36)';
      
      return 'Dozen';
    }

    case RouletteBetCategory.COLUMN: {
      const index = extractIndex(bet.selection);
      return index ? `Column ${index}` : 'Column';
    }

    case RouletteBetCategory.CORNER: {
      const range = extractRange(bet.selection);
      return range
        ? `Corner (${formatNumber(range[0])}-${formatNumber(range[1])})`
        : 'Corner';
    }

    case RouletteBetCategory.DOUBLE_STREET: {
      const range = extractRange(bet.selection);
      return range
        ? `Double Street (${formatNumber(range[0])}-${formatNumber(range[1])})`
        : 'Double Street';
    }

    case RouletteBetCategory.STREET: {
      const range = extractRange(bet.selection);
      return range
        ? `Street (${formatNumber(range[0])}-${formatNumber(range[1])})`
        : 'Street';
    }

    case RouletteBetCategory.TOP_LINE: {      
      return `Top-Line`;
    }

    case RouletteBetCategory.ROW: {      
      return `Row`;
    }

    case RouletteBetCategory.SPLIT: {      
      const [a, b] = bet.selection.split('_');

      if (!a || !b) return 'Split';

      return `Split ${formatNumber(a)} & ${formatNumber(b)}`;
    }

    case RouletteBetCategory.NUMBER:
      return `Single Number ${bet.selection}`;

    default:
      return `${bet.category} ${bet.selection}`;
  }
}
